import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
var date_format = require('date-format');

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeChart = this.onChangeChart.bind(this);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      chart: 'Billboard Hot 100',
      artist: '',
      date: new Date(),
      charts: ['Billboard Hot 100', 'Billboard Global 200']
    }
  }

  onChangeChart(e) {
    this.setState({
      chart: e.target.value
    })
  }

  onChangeArtist(e) {
    this.setState({
      artist: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const query = {
      chart: this.state.chart,
      artist: this.state.artist,
      date: this.state.date
    }
    console.log(query);

    window.location = `/search?chart=${this.state.chart}&date=${date_format('yyyy-MM-dd',this.state.date)}&artist=${this.state.artist}`
  }

  render() {
    return (
    <div>
      <h3>Search</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Target Chart: </label>
          <select ref="chartInput"
              required
              className="form-control"
              value={this.state.chart}
              onChange={this.onChangeChart}>
              {
                this.state.charts.map(function(chart) {
                  return <option 
                    key={chart}
                    value={chart}>{chart}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Artist(option): </label>
          <input  type="text"
              className="form-control"
              value={this.state.artist}
              onChange={this.onChangeArtist}
              />
        </div>
  
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
              maxDate={new Date()}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Search" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}