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


export default function ModalContent({positions, positionsHist}: any) {
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

            var newPositions: any = []

            var hist_before = positionsHist[key + 1]

            if (!hist_before) {
                return
            }

            element.positions.forEach((position: any, index: any) => {

                var position_info = positions.find((e: any) => e.symbol === position.symbol)

                var position_before = hist_before.positions.find((e: any) => e.symbol === position.symbol)

                var variation = ((position.price - position_before.price) / position_before.price) * 100
                
                newPositions.push({
                    ...position, 
                    variation,
                    link: position_info.link, 
                    name: position_info.name, 
                    tag: position_info.tag,
                    plusvalue: (position.price * position.volume) - (position_before.price * position_before.volume)
                })

            });

            const total = element.positions.reduce((total: any, objet: any) => {
                const budgetElement = objet.price * objet.volume;
                return total + budgetElement;
            }, 0)

            const total_before = hist_before.positions.reduce((total: any, objet: any) => {
                const budgetElement = objet.price * objet.volume;
                return total + budgetElement;
            }, 0)

            element.variation = ((total - total_before) / total_before) * 100
            element.total = total
            element.benefice = total - total_before
            
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
                                    <div
                                        style={{
                                            display: "flex",
                                            paddingTop: "2vh",
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
                                                            padding: padding 
                                                        }}
                                                        >
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