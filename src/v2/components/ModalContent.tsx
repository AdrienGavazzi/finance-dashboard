import React from "react"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ApiService from "../services/api.service";

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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}
  
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const fontSize = "12px";
const padding = "10px 10px";


export default function ModalContent({positions, positionsOld, positionsHist}: any) {
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState<any>([]);

    React.useEffect(() => {
        setData([])

        positionsHist
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .forEach((element: any, key: any) => {
                
            if (key === positionsHist.length) {
                return
            }

            var deposits: any = []

            var newPositions: any = []

            var tags: any = {"etf": {total: 0, total_before: 0, variation: 0}, "action": {total: 0, total_before: 0, variation: 0}, "crypto": {total: 0, total_before: 0, variation: 0}}

            var hist_before = positionsHist[key + 1]

            if (!hist_before) {
                return
            }

            element.positions.forEach((position: any, index: any) => {

                try {

                    var position_info = positions.find((e: any) => e.symbol === position.symbol)

                    if (!position_info) {
                        position_info = positionsOld.find((e: any) => e.symbol === position.symbol)
                    }

                    var position_before = hist_before.positions.find((e: any) => e.symbol === position.symbol)

                    var variation = 0

                    if (position_before) {

                        variation = ((position.price - position_before.price) / position_before.price) * 100

                        if (position.volume !== position_before.volume) {
                            deposits.push({symbol: position.symbol, value: position.price * (position.volume - position_before.volume)})
                        }
                        
                        tags[position_info.tag].total = tags[position_info.tag].total + (position.volume * position.price)
                        tags[position_info.tag].total_before = tags[position_info.tag].total_before + (position.volume * position_before.price)
                        
                    }

                    newPositions.push({
                        ...position, 
                        variation,
                        link: position_info.link, 
                        name: position_info.name, 
                        tag: position_info.tag,
                        plusvalue: (position.price * position.volume) - (position_before.price * position.volume)
                    })

                } catch (error) {
                    console.log(error, position.symbol)
                }

            });

            const total = element.positions.reduce((total: any, objet: any) => {
                const budgetElement = objet.price * objet.volume;
                return total + budgetElement;
            }, 0)

            const total_before = hist_before.positions.reduce((total: any, objet: any) => {
                const budgetElement = objet.price * objet.volume;
                return total + budgetElement;
            }, 0)

            const total_deposit = deposits.reduce((total: any, objet: any) => {
                return total + objet.value;
            }, 0)

            tags["etf"].variation = ((tags["etf"].total - tags["etf"].total_before) / tags["etf"].total_before) * 100
            tags["action"].variation = ((tags["action"].total - tags["action"].total_before) / tags["action"].total_before) * 100
            tags["crypto"].variation = ((tags["crypto"].total - tags["crypto"].total_before) / tags["crypto"].total_before) * 100

            element.variation = ((total - total_before) / total_before) * 100
            element.total = total
            element.benefice = total - total_before
            element.deposits = deposits
            element.deposit = total_deposit

            element.tags = tags
            
            element.positions = newPositions.sort((a: any, b: any) => b.variation - a.variation)

            setData((data: any) => [...data, element].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
        });

    }, [positionsHist, positions])
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };


    return (
        
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                {
                    data.map((element: any, index: number) => {
                        return (
                            <Tab label={element.date.split("T")[0]} {...a11yProps(index)} key={index} />
                        )
                    })
                }
            </Tabs>
            {
                data.map((element: any, index: number) => {
                    return (
                        <TabPanel value={value} index={index} key={index}>
                            <div>
                                <div className="modal-last-days-resume">
                                    <h1>Day Resume</h1>
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                paddingTop: "6vh",
                                                flex: "3",
                                                minWidth: "40%"
                                            }}>
                                                <div>
                                                    <h3>{element.total.toFixed(1)} €</h3>
                                                </div>
                                                <div style={{margin: "auto auto 0px 10px"}}>
                                                    <h5
                                                        style={{
                                                            color: element.variation < 0 ? "red" : "#5edd23",
                                                        }}>
                                                        {element.benefice > 0 ? "+ ": ""}
                                                        {element.benefice.toFixed(0)} €
                                                    </h5>
                                                </div>
                                        </div>
                                        <h4
                                            style={{
                                                color: element.variation < 0 ? "red" : "#5edd23",
                                            }}>{
                                            element.variation > 0 ? 
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
                                            }
                                            {element.variation.toFixed(2)} %
                                        </h4>
                                    </div>
                                    <div className="modal-last-days-tags">
                                        {
                                            ["etf", "action", "crypto"].map((tag: string, index: number) => {
                                                try {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <h3>{tag.toLocaleUpperCase()}</h3>
                                                                <h4
                                                                    style={{
                                                                        color: element.tags[tag].variation < 0 ? "red" : "#5edd23",
                                                                    }}
                                                                    >
                                                                    {Number(element.tags[tag].variation) > 0 ? "+": ""}
                                                                    {Number(element.tags[tag].variation).toFixed(2) + " %"}
                                                                </h4>
                                                            </div>
                                                            <h4>{Number(element.tags[tag].total).toFixed(2) + " €"}</h4>
                                                        </div>
                                                    )
                                                } catch (error) {
                                                    return null
                                                }
                                            })
                                        }
                                    </div>
                                    {
                                        element.deposit > 0 ?
                                        <div className="modal-last-days-deposits">
                                            <div style={{display: "flex"}}>
                                                <h3>Deposits:</h3>
                                                <h4>+ {element.deposit.toFixed(2)} €</h4>
                                            </div>
                                            {
                                                element.deposits.map((deposit: any, index: number) => {
                                                    return <p key={index}>{deposit.symbol} - {deposit.value.toFixed(2)}</p>
                                                })
                                            }
                                        </div>
                                        :
                                        <div className="modal-last-days-deposits" style={{backgroundColor: "#ffffff00"}}>
                                        </div>
                                    }
                                </div>
                                <TableContainer>
                                    <Table sx={{ width: "100%" }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    align="left"
                                                    style={{ fontSize: fontSize, padding: padding }}
                                                >
                                                    Symbol
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ fontSize: fontSize, padding: padding }}
                                                >
                                                    Name
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ fontSize: fontSize, padding: padding}}
                                                >
                                                    Change
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ fontSize: fontSize, padding: padding }}
                                                >
                                                    Price
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ fontSize: fontSize, padding: padding }}
                                                >
                                                    PRU
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ fontSize: fontSize, padding: padding }}
                                                >
                                                    Vol.
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ fontSize: fontSize, padding: padding }}
                                                >
                                                    Value
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{ fontSize: fontSize, padding: padding}}
                                                >
                                                    +/- 
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {element.positions.map((row: any) => (
                                                <TableRow
                                                    key={row.symbol}
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    style={{ fontSize: fontSize }}
                                                >
                                                    <TableCell
                                                        align="left"
                                                        style={{ 
                                                            position: "relative",
                                                            fontSize: fontSize, 
                                                            padding: padding,
                                                            backgroundImage: tagsStyles[row.tag].background,
                                                            color: "#F1F1F1"
                                                        }}
                                                        >
                                                            {/* {console.log(tagsStyles[row.tag].background)} */}
                                                            {row.symbol.split(".PA")[0]}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{
                                                            fontSize: fontSize,
                                                            padding: padding,
                                                            cursor: "pointer",
                                                        }}
                                                        >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{
                                                            position: "relative",
                                                            fontSize: fontSize,
                                                            padding: padding,
                                                            color: row.variation < 0 ? "red" : "#5edd23",
                                                            fontWeight: "bold",
                                                        }}
                                                        >
                                                            {Number(row.variation).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{ fontSize: fontSize, padding: padding }}
                                                        >
                                                        {Number(row.price).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{ fontSize: fontSize, padding: padding }}
                                                        >
                                                        {Number(Number(row.PRU).toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{ fontSize: fontSize, padding: padding }}
                                                        >
                                                        {Number(Number(row.volume).toFixed(3))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{ fontSize: fontSize, padding: padding }}
                                                        >
                                                        {Number(row.price * row.volume).toFixed(0)}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{ 
                                                            fontSize: fontSize, 
                                                            padding: padding,
                                                            color: row.plusvalue < 0 ? "red" : "#5edd23",
                                                        }}
                                                        >
                                                        {row.plusvalue.toFixed(1)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>
                    )
                })
            }
        </div>
    )
}