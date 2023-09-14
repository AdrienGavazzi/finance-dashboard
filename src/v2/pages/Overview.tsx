import React, { useEffect } from "react";
import PositionTable from "../components/PositionTable";
import ApiService from "../services/api.service";

import "../styles/styles.css";
import BottomPanel from "../components/BottomPanel";
import { set } from "date-fns";


export default function Dashboard() {

    const [positions, setPositions] = React.useState<any[]>([]);
    const [positionsOld, setPositionsOld] = React.useState<any[]>([]);
    const [positionsHist, setPositionsHist] = React.useState<any[]>([]);

    useEffect(() => {
        
        document.title = 'Overview';

        setPositions([])
        setPositionsHist([])

        ApiService.getPositionsList().then((response) => {
            response.data.data.forEach((position: any) => {
                ApiService.getPositionsLive(position.symbol).then((data) => {
                    setPositions(positions => [...positions, data.data.data[0]].sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB) {
                          return -1;
                        } else if (nameA > nameB) {
                          return 1;
                        } else {
                          return 0;
                        }
                      }));
                })
            })
        })

        ApiService.getPositionsListOld().then((response) => {
            setPositionsOld(response.data.data)
        })

        var start_date: any = new Date()
        start_date.setMonth(start_date.getMonth() - 1);
        var end_date: any = new Date()
        end_date.setDate(end_date.getDate() + 1)

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
                <BottomPanel positions={positions} positionsOld={positionsOld} positionsHist={positionsHist} />
            </div>
        </div>
    )
}   