import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ArtistsList from "./components/artist-list.component";
import Artistdetail from "./components/artist-detail.component";
import SearchResult from "./components/search-result.component";
import SearchQuery from "./components/search-query.component";
import CreateArtist from "./components/create-artist.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
        <Route path="/" exact component={SearchQuery} />
        <Route path="/search" component={SearchResult} />
        <Route path="/artists" component={ArtistsList} />
        <Route path="/artist/:artistname" component={Artistdetail} />
        <Route path="/create" component={CreateArtist} />
      </div>
    </Router>
  );
}

export default App;
