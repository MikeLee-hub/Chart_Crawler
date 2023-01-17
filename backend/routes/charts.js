const router = require('express').Router();
let Artist = require('../models/artist.model');
let Chart = require('../models/chart.model');
const BillboardCrawler = require('../crawlers/billboard.crawler');
var date_format = require('date-format');

router.route('/day').get((req, res) => {
  let Crawler = new BillboardCrawler();
  var artist = req.query.artist;

  if (artist === undefined || artist == null || artist == ''){
    Artist.find({}, 'artistname')
    .then(artists => {
      var artist_list = []
      artists.forEach(artist =>{
        artist_list.push(artist.artistname);
      });
      Crawler.getChart(req.query.chart, req.query.date, artist_list)
        .then(ans => res.json(ans))
    })
  }
  else{
    Crawler.getChart(req.query.Chart, req.query.date,[artist])
      .then(ans => res.json(ans))
  }
});

router.route('/artist/:artistname').get((req, res) => {
  let Crawler = new BillboardCrawler();

  Chart.find({artistname: req.params.artistname}).sort({'chartname':-1, 'date':1})
    .then(artists => {
      console.log(artists);
      res.json(artists)
    });

});


module.exports = router;



