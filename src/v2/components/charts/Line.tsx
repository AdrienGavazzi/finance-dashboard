import React, { useEffect } from "react";
import Chart from "react-apexcharts";

import Loading from "../../../layout/Loading";


export default function Line({data, categories, deposits }: any) {
    
    const _options: any = {
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

    const [series, setSeries] = React.useState<any>([]);
    const [options, setOptions] = React.useState<any>(_options);


    React.useEffect(() => {
        setSeries([
              {
                name: "value",
                data: data,
              },
              {
                name: "deposit",
                data: deposits,
              },
            ])
        
        setOptions({...options, ...{
            xaxis: {
                categories: categories,
                labels: {
                  show: false,
                },
            }
        }})


    }, [data, deposits, categories])


    if (!data || !categories) {
      return <Loading />;
    }


    return (
        <div style={{width: "100%", height: "100%"}}>
            <Chart options={options} series={series} width="100%" height="100%" />
        </div>
    )
}   