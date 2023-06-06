import React from "react";
import PositionRow from "./PositionRow";
import PositionHead from "./PositionHead";

const tagsStyles: any = {
    "etf": {
        "background": "linear-gradient(to right bottom, #0093E9, #80C5D0e0)",
        "color": "#0093E9"
    },
    "action": {
        "background": "linear-gradient(to right bottom, #57CA22, #91CA22e0)",
        "color": "#57CA22"
    },
    "crypto": {
        "background": "linear-gradient(to right bottom, #FC6835, #FC9235e0)",
        "color": "#FC6835"
    }
}

export default function PositionTable({positions, positionsHist}: any) {


    return (
        <div className="positions-div">
            {
                ["etf", "action", "crypto"].map((tag: string, index: number) => {
                    return (
                        <div key={index}>
                            <div
                                className="position-div-head"
                                style={{
                                    backgroundImage: tagsStyles[tag].background,
                                }}
                                >
                                <PositionHead positions={positions?.filter((objet: any) => objet.tag === tag)} positionsHist={positionsHist} tag={tag} />
                            </div>
                            <div className="positions-table">
                                <PositionRow positions={positions?.filter((objet: any) => objet.tag === tag)} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}   