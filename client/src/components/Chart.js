import React from "react";
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

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

Chart.propTypes = {
  votes: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      __id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  name: PropTypes.string.isRequired
}
export default Chart;