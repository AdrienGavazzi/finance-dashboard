import React, { useEffect } from "react";
import PositionTable from "../components/PositionTable";
import ApiService from "../services/api.service";

import "../styles/styles.css";
import BottomPanel from "../components/BottomPanel";


export default function Dashboard() {

    const [positions, setPositions] = React.useState<any[]>([]);
    const [positionsHist, setPositionsHist] = React.useState<any[]>([]);

    useEffect(() => {
        
        document.title = 'Overview';

        setPositions([])
        setPositionsHist([])

        ApiService.getPositionsList().then((response) => {
            response.data.data.forEach((position: any) => {
                ApiService.getPositionsLive(position.symbol).then((data) => {
                    setPositions(positions => [...positions, data.data.data[0]]);
                })
            })
        })

        var start_date: any = new Date()
        start_date.setMonth(start_date.getMonth() - 1);
        var end_date: any = new Date()

        start_date = start_date.toISOString().split("T")[0]
        end_date = end_date.toISOString().split("T")[0]

        ApiService.getPositionsHistory(start_date, end_date)
            .then((data) => {
                setPositionsHist(data.data.data)
            })
    }, [])


    return (
        <div style={{width: "100%", height: "100vh"}} className="overview">
            <div className="overview-table">
                <PositionTable positions={positions} positionsHist={positionsHist} />
            </div>
            <div className="overview-graph">
                <BottomPanel positions={positions} />
            </div>
        </div>
    )
}   