import React, {useState, useEffect} from "react";
import {fetchDailyData} from "../../api";
import {Line, Bar} from 'react-chartjs-2';
import styles from "./Charts.module.css"

// data is prop taking in that gets data.confirmed into confirmed etc
const Charts = ({data: {confirmed, deaths, recovered}, country}) => {
    // dailyData is an array, each element holds a struct of date, confirmed, deaths, and recovered
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        // define fetchAPI
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        // console.log(dailyData);
        // calls the fetch
        fetchAPI();
    }, []);

    const lineChart = (
        // tertiary form if length is not zero do line else return null
        dailyData.length ? (
        <Line
            data = {{
                // (object) {function}
                labels: dailyData.reverse().map(({date}) => new Date(date).toLocaleDateString()),
                datasets: [{
                    data: dailyData.map((data) => data.confirmed),
                    label:'Infected',
                    borderColor: '#3333ff',
                    fill:true,
                },{
                    data: dailyData.map((data) => data.deaths),
                    label:'Deaths',
                    borderColor: 'red',
                    borderColor: 'rgba(255,0,0,0.5)',
                    fill:true,  
                },{
                    data: dailyData.map((data) => data.recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0,255,0,0.5)',
                    fill:true,
                }],
            }}
        />) : null
    );

    const barChart = (
        confirmed
        ? (
            // double {{}}, one makes dynamic i.e. js and the other specifies object
            <Bar
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)',],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options = {{
                    legend: {display: false},
                    title: {display:true, text: `Current state in ${country}`},
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart: lineChart}
        </div>
    )
}

export default Charts;