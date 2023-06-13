import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Loading from "../../layout/Loading";


export default function PositionHead({positions, positionsHist, tag}: any) {

    const options: any = {
        chart: {
        id: "chartTotal",
        type: "line",
        zoom: {
            enabled: false,
        },
        sparkline: {
            enabled: true,
        },
        toolbar: {
            show: false,
        },
        brush: {
            target: "chartTotal",
            enabled: true,
        },
        },
        xaxis: {
        categories: [],
        },
        colors: ["#fff"],
        stroke: {
        width: 3,
        curve: "smooth",
        },
        legend: {
        show: false,
        },
    };

    const series: any = [
        {
            name: "value",
            data: [],
        },
    ];
    
    const [total, setTotal] = React.useState<number>();
    const [deposit, setDeposit] = React.useState<number>();
    const [variation, setVariation] = React.useState<string>();
    const [monthVar, setMonthVar] = React.useState<string>();
    const [graphLabels, setGraphLabels] = React.useState<any>(options);
    const [graphSeries, setGraphSeries] = React.useState<any>(series);

    useEffect(() => {
        var totalAll = positions.reduce((total: any, objet: any) => {
            const budgetElement = objet.data.price * objet.number;
            return total + budgetElement;
          }, 0)
        var depositAll = positions.reduce((total: any, objet: any) => {
            const budgetElement = objet.PRU * objet.number;
            return total + budgetElement;
          }, 0)

        var variationAll = ((totalAll - depositAll) / depositAll) * 100;
        setTotal(totalAll.toFixed(1))
        setDeposit(depositAll.toFixed(1))
        setVariation(variationAll.toFixed(1))

        var symbols = positions.map((obj: any) => obj.symbol)

        var data: any = series
        var labels: any = options

        for (var hist of positionsHist) {

            var totalDay = hist.positions.reduce((total: any, objet: any) => {
                if (symbols.includes(objet.symbol)) {
                    const budgetElement = objet.price * objet.volume;
                    return total + budgetElement;
                } else {
                    return total
                }
            }, 0)

            data[0].data.push(totalDay)
            labels.xaxis.categories.push(hist.date.split("T")[0])
        }

        setGraphLabels(labels)
        setGraphSeries(data)
 
    }, [positions, positionsHist])

    
    if (positions.length === 0) {
        return (
            <div className="positions-head">
                <Loading color="white" />
            </div>
        );
    }


    return (
        <div className="positions-head">
            <div style={{backgroundColor: "#f1f1f197"}} className="positions-head-tag">
                {tag.toUpperCase()}
            </div>
            <div>
                <h1>{total} €</h1>
                <h4>{deposit} €</h4>
            </div>
            <div className="positions-head-variation">
                <h3>{
                    Number(total) > Number(deposit) ? 
                        <TrendingUpIcon
                        className="icon"
                        sx={{ fontSize: 25 }}
                        style={{ backgroundColor: "#ffffffe0", color: "#388116" }}
                        />
                    :
                        <TrendingDownIcon
                        className="icon"
                        sx={{ fontSize: 25 }}
                        style={{ backgroundColor: "#ffffffe0", color: "red" }}
                        />
                } {variation} %</h3>
            </div>
            <div className="positions-head-chart">
                <Chart options={graphLabels} series={graphSeries} width="70%" height="80%" />
            </div>
            <div>
                <h5>Last Month : {0.00 + "%"}</h5>
            </div>
        </div>
    )
}   