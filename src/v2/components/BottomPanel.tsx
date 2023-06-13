import React, { useEffect } from "react";

import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import RefreshIcon from '@mui/icons-material/Refresh';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import Line from "./charts/Line";
import Loading from "../../layout/Loading";
import Donut from "./charts/Donut";

import { getFundHistory } from "../../utils/API";
import ModalContent from "./ModalContent";

const labelContent = (e: any) => `${e.value}%`;

const renderTooltip = (e: any) => {
  return <div>{e.point ? e.point.category : ""}</div>;
};


export default function BottomPanel({positions, positionsHist}: any) {
    
    const [lineSeries, setLineSeries] = React.useState<any>([]);
    const [lineSeriesDeposit, setLineSeriesDeposit] = React.useState<any>([]);
    const [lineCategories, setLineCategories] = React.useState<any>([]);
    const [total, setTotal] = React.useState<number>();
    const [deposit, setDeposit] = React.useState<number>();
    const [donutSeries, setDonutSeries] = React.useState<any>([]);
    const [donutCategories, setDonutCategories] = React.useState<any>([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {

        if (lineSeries.length === 0) {
            getHistory()
        }

        // Calcul du budget total
        const totalBudget = positions.reduce((total: any, objet: any) => {
            if (objet.data.price) {
                var budgetElement = objet.number * objet.data.price;
            } else {
                var budgetElement = 0;
            }
            return total + budgetElement;
        }, 0);
        
        const totalDeposit = positions.reduce((total: any, objet: any) => {
            if (objet.data.price) {
                var budgetElement = objet.number * objet.PRU;
            } else {
                var budgetElement = 0;
            }
            return total + budgetElement;
        }, 0);
        
        setTotal(totalBudget)
        setDeposit(totalDeposit)
        
        var labels: any = []
        var series: any = []

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
            
            labels.push(tag.toUpperCase() + " " + sommeParTag.toFixed(0) + "€");
            series.push(pourcentage);
        });

        setDonutSeries(series)
        setDonutCategories(labels)

    }, [positions])


    async function getHistory() {
        var series_data: any = [];
        var series_data_deposit: any = [];
        var labels: any = [];

        getFundHistory().then((data: any) => {
            data.data.data.forEach((element: any) => {
                series_data.push(parseInt(element.assets).toString())
                series_data_deposit.push(parseInt(element.deposit).toString())
                labels.push(element.date)
            })
        });

        setLineSeries(series_data)
        setLineSeriesDeposit(series_data_deposit)
        setLineCategories(labels)
    }


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
                    <Donut data={donutSeries} categories={donutCategories}/>
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
                <div className="history-title">
                    <h1>History</h1>
                </div>
                <Line data={lineSeries} deposits={lineSeriesDeposit} categories={lineCategories} />
            </div>
            <div className="button-div">
                <div onClick={handleOpen}>
                    <EventRepeatIcon
                        sx={{ fontSize: 25 }}
                        style={{ color: "black", margin: "auto" }}
                        />
                </div>
                <div>
                    <RefreshIcon
                        sx={{ fontSize: 25 }}
                        style={{ color: "black", margin: "auto" }}
                        onClick={() => window.dispatchEvent(new Event('resize'))}
                        />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal-last-days">
                    <div className="modal-title">
                        <h1>Last Days Data</h1>
                    </div>
                    <div onClick={handleClose} className="modal-close-icon">
                        <CloseIcon sx={{ fontSize: 30 }} />
                    </div>
                    <div className="modal-last-days-content">
                        <ModalContent positions={positions} positionsHist={positionsHist} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}   