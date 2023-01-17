import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Artist = props => (
  <tr>
    <td>{props.artist.artistname}</td>
    <td>{props.artist.updated}</td>
    <td>
      <a href="#" onClick={() => { props.artistDetail(props.artist.artistname) }}>show detail</a>
    </td>
    <td>
      <a href="#" onClick={() => { props.updateArtist(props.artist._id) }}>update</a>
      &nbsp; / &nbsp;
      <a href="#" onClick={() => { props.deleteArtist(props.artist._id) }}>delete</a>
    </td>
  </tr>
)

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
  
    this.artistDetail = this.artistDetail.bind(this);
    this.deleteArtist = this.deleteArtist.bind(this);
    this.updateArtist = this.updateArtist.bind(this);
    this.state = {artists: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/artists/')
      .then(response => {
        this.setState({ artists: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  artistDetail(artistname) {
    console.log(artistname);
    window.location = `/artist/${artistname}`;
  }

  updateArtist(id) {
    axios.post('http://localhost:5000/artists/update/'+id)
      .then(response => { 
        console.log(response.data);
        window.location.reload();
      });
  }

  deleteArtist(id) {
    axios.delete('http://localhost:5000/artists/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      artists: this.state.artists.filter(el => el._id !== id)
    })
  }

  artistList() {
    return this.state.artists.map(currentartist => {
      if(currentartist.updated != null && currentartist.updated !== undefined)
        currentartist.updated = currentartist.updated.substring(0,10);
      return <Artist artist={currentartist} deleteArtist={this.deleteArtist} updateArtist={this.updateArtist} artistDetail={this.artistDetail} key={currentartist._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Artists</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Artistname</th>
              <th>last update</th>
              <th>detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.artistList() }
          </tbody>
        </table>
      </div>
    )
  }
}