import React from 'react';
import { useState, useEffect } from 'react';
import csvtojson from 'csvtojson';
import { Line } from 'react-chartjs-2';

export default function ReadData() {
  const URL =
    'https://docs.google.com/spreadsheets/d/1LQxT9ceg_1vWXny9d3nFCRM5cYmzGVtIZ_0YStCunn8/export?format=csv';
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetch(URL);
    const csvData = await res.text();
    const data = await csvtojson().fromString(csvData);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const chartData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    datasets: [
      {
        label: 'My First Dataset',
        data: data?.map((item) => item.age),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      {data && data.length !== 0 ? (
        data?.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <p>Age: {item.age}</p>
          </div>
        ))
      ) : (
        <h4>Loading...</h4>
      )}
      <hr />
      <Line data={chartData} />
    </div>
  );
}
