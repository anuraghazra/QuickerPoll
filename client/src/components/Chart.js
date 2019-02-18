import React from "react";
import { Pie } from 'react-chartjs-2';

const Chart = ({ votes, name }) => {
  const parseChartdata = () => {
    const labels = [];
    const data = [];
    const colors = [];
    for (let i = 0; i < votes.length; i++) {
      labels.push(votes[i].name);
      data.push(votes[i].value);
      colors.push(votes[i].color);
    }
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: name,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
          data: data
        }
      ]
    }
    return chartData;
  }

  const chartdata = parseChartdata();
  return (
    <Pie
      data={chartdata}
      options={{ maintainAspectRatio: true }}
    />
  )
}

export default Chart;