import React, { useEffect } from "react";
import Chart2 from "react-apexcharts";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels, //ChartTitle,
  ChartTooltip,
} from "@progress/kendo-react-charts";

import EventRepeatIcon from '@mui/icons-material/EventRepeat';

import PerformanceLine from "../../panels/Components/PerformanceLine";

import { getFundHistory } from "../../utils/API";
import Loading from "../../layout/Loading";

const labelContent = (e: any) => `${e.value}%`;

const renderTooltip = (e: any) => {
  return <div>{e.point ? e.point.category : ""}</div>;
};


export default function BottomPanel({positions}: any) {

    const series = [
        {
          name: "value",
          data: [],
        },
        {
          name: "deposit",
          data: [],
        },
    ];

    const options: any = {
        chart: {
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        xaxis: {
          categories: [],
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        colors: ["#16ACEA", "#d51a399a"],
        stroke: {
          width: [2.5, 2.5],
          curve: "smooth",
        },
        legend: {
          show: false,
        },
        grid: {
          show: false,
        },
    };
    
    const [lineSeries, setLineSeries] = React.useState<any>(series);
    const [lineCategories, setLineCategories] = React.useState<any>(options);
    const [total, setTotal] = React.useState<number>();
    const [deposit, setDeposit] = React.useState<number>();
    const [donutData, setDonutData] = React.useState<any>({labels: [], series: []});

    useEffect(() => {

        var series_data: any = series;
        var labels: any = options;

        getFundHistory().then((data: any) => {
            data.data.data.forEach((element: any) => {
                series_data[0].data.push(parseInt(element.assets).toString())
                series_data[1].data.push(parseInt(element.deposit).toString())
                labels.xaxis.categories.push(element.date)
            })
        });

        setLineSeries(series_data)
        setLineCategories(labels)

        // Calcul du budget total
        const totalBudget = positions.reduce((total: any, objet: any) => {
            const budgetElement = objet.number * objet.predict.price;
            return total + budgetElement;
        }, 0);
        
        const totalDeposit = positions.reduce((total: any, objet: any) => {
            const budgetElement = objet.number * objet.PRU;
            return total + budgetElement;
        }, 0);
        
        setTotal(totalBudget)
        setDeposit(totalDeposit)
        

        // Création de l'objet avec les arrays "labels" et "series"
        const nouvelObjet: any = {
            labels: [],
            series: []
        };

        // Obtention des tags uniques
        const tagsUniques = positions
            .map((objet: any) => objet.tag)
            .filter((tag: string, index: number, tags: any) => tags.indexOf(tag) === index);

        // Calcul des pourcentages pour chaque tag
        tagsUniques.forEach((tag: any) => {
            const sommeParTag = positions
                .filter((objet: any) => objet.tag === tag)
                .reduce((somme: any, objet: any) => somme + (objet.number * objet.data.price), 0);
            
            const pourcentage = (sommeParTag / totalBudget) * 100;
            
            nouvelObjet.labels.push(tag);
            nouvelObjet.series.push(pourcentage);
        });

        console.log(nouvelObjet);

        // setDonutData(nouvelObjet)

    }, [positions])


    if (!total) {
        return (
            <div className="bottom-div">
                <div className="resume-div">
                    <div className="resume-title">Resume</div>
                    <div style={{margin: "auto"}}>
                        <Loading color={"white"}/>
                    </div>
                </div>
                <div className="history-chart">
                    <Loading />
                </div>
                <div className="button-div">
                </div>
            </div>
        )
    }


    return (
        <div className="bottom-div">
            <div className="resume-div">
                <div className="resume-title">Resume</div>
                <div className="resume-donut">
                    {/* <Chart>
                        <ChartSeries>
                        <ChartSeriesItem type="donut" data={donutData}>
                            <ChartSeriesLabels
                            content={labelContent}
                            background="none"
                            color="#fff"
                            />
                        </ChartSeriesItem>
                        </ChartSeries>
                        <ChartLegend position={"bottom"} visible={true} />
                        <ChartTooltip render={renderTooltip} />
                    </Chart> */}
                </div>
                <div className="fund-div">
                    <div>
                        <h1 style={{color: "#ffffffa8"}}>Total:</h1>
                        <h1 style={{margin: "0px auto 0px 10%", fontSize: "35px"}}>{total?.toFixed(0)} €</h1>
                        <h3 style={{color: "#8c8c8ca8"}}>Deposit:</h3>
                        <h3 style={{margin: "0px auto 0px 10%", fontSize: "20px"}}>{deposit?.toFixed(0)} €</h3>
                        <div>
                            <div
                                style={{
                                    backgroundColor: (Number(total) - Number(deposit)) > 0 ?  "#57CA22" : "red",
                                    borderBottomLeftRadius: "7px"
                                }}
                                >
                                <h5>
                                    {(Number(total) - Number(deposit)) > 0 ? "+ ": "  "}
                                    {(Number(total) - Number(deposit)).toFixed(0)} 
                                    €
                                </h5>
                            </div>
                            <div
                                style={{
                                    backgroundColor: (Number(total) - Number(deposit)) > 0 ?  "#57CA22" : "red"}}
                                >
                                <h5>
                                    {(Number(total) - Number(deposit)) > 0 ? "+ ": "  "}
                                    {(((Number(total) - Number(deposit))/ Number(deposit)) * 100).toFixed(0)} 
                                    %
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="history-chart">
                <Chart2 options={lineCategories} series={lineSeries} width="100%" height="100%" />
            </div>
            <div className="button-div">
                <div>
                    <EventRepeatIcon
                        sx={{ fontSize: 25 }}
                        style={{ color: "black", margin: "auto" }}
                        />
                </div>
            </div>
        </div>
    )
}   