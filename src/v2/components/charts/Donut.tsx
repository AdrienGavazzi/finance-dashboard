import React, { useEffect } from "react";
import Chart from "react-apexcharts";

import Loading from "../../../layout/Loading";


export default function Donut({data, categories }: any) {
    
      const _options: any = {
        chart: {
          type: 'pie',
        },
        labels: [],
        legend: {
            position: 'bottom',
            fontSize: '17px',
            labels: {
                colors: '#fff',
            },
        },
        strokeColors: 'transparent',
      }

    const [series, setSeries] = React.useState<any>([]);
    const [options, setOptions] = React.useState<any>(_options);


    React.useEffect(() => {
        setSeries(data)
        
        setOptions({...options, ...{
            labels: categories
        }})


    }, [data, categories])


    if (!data || !categories) {
      return <Loading />;
    }


    return (
        <div style={{width: "100%", height: "30vh"}}>
            <Chart options={options} series={series} type="pie" width="100%" height="100%" />
        </div>
    )
}