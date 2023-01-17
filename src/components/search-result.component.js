import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';


const Chart = props => (
  <tr>
    <td>{props.chart.artistname}</td>
    <td>{props.chart.songname}</td>
    <td>{props.chart.chartname}</td>
    <td>{props.chart.rank}</td>
    <td>{props.chart.date}</td>
    <td>
    </td>
  </tr>
)

const query = qs.parse(window.location.search,  {
  ignoreQueryPrefix: true
});

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {chartresults: []};
  };

  componentDidMount() {
    const serve_url = `http://localhost:5000/charts/day?chart=${query.chart}&date=${query.date}&artist=${query.artist}`
    axios.get(serve_url)
      .then(response => {
        this.setState({ chartresults: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  chartList() {
    return this.state.chartresults.map(currentchart => {
      return <Chart chart={currentchart} key={currentchart._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Billboard Ranked</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Artist name</th>
              <th>Song name</th>
              <th>chart</th>
              <th>Rank</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.chartList() }
          </tbody>
        </table>
      </div>
    )
  }
}