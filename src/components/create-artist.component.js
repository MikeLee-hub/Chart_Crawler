import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

export default class CreateArtist extends Component {
  constructor(props) {
    super(props);

    this.onChangeArtistname = this.onChangeArtistname.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      artistname: '',
      date: new Date()
    }
  }

  onChangeArtistname(e) {
    this.setState({
      artistname: e.target.value
    })
  }
  
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      artistname: this.state.artistname,
      debut: this.state.date
    }

    console.log(user);

    axios.post('http://localhost:5000/artists/add', user)
      .then(res => console.log(res.data));

    this.setState({
      artistname: '',
      debut: new Date()
    })
  }

  render() {
    return (
      <div>
        <h3>Add Artist For Search</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Artist: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.artistname}
                onChange={this.onChangeArtistname}
                />
          </div>

          <div className="form-group">
            <label>Debut: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Add Artist" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}