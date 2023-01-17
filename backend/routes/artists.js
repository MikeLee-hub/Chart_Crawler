const router = require('express').Router();
let Artist = require('../models/artist.model');
const BillboardCrawler = require('../crawlers/billboard.crawler');
let Chart = require('../models/chart.model');
var date_format = require('date-format');

var charts_list = ['Billboard Hot 100', 'Billboard Global 200']//, 'Billboard 200']

router.route('/').get((req, res) => {
    Artist.find()
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const artistname = req.body.artistname;
  const debut = req.body.debut;

  const newArtist = new Artist(
    {
      artistname : artistname,
      debut : debut
    });
  
  newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Artist.findById(req.params.id)
    .then(artist => {
      var last_updated
      let Crawler = new BillboardCrawler();

      if(artist.updated === undefined || artist.updated == null){
        last_updated = artist.debut;
      }
      else{
        last_updated = artist.updated;
      }
      console.log(last_updated);

      if (last_updated.getDay() <= 6){
        last_updated.setDate(last_updated.getDate()+ (6 - Number(last_updated.getDay())));
      }
      else{
        last_updated.setDate(last_updated.getDate()+ 6);
      }
      
      while(last_updated <= new Date()){
        charts_list.forEach(chart_name => {
          Crawler.getChart(chart_name, date_format('yyyy-MM-dd', last_updated), [artist.artistname])
          .then(search_result => {
            search_result.forEach(element => {
              const newchart = new Chart(element);
              newchart.save();
            });
          });
        });
        last_updated.setDate(last_updated.getDate()+ 7);
      }

      Artist.findByIdAndUpdate(req.params.id, {updated: new Date()})
        .then(() => res.json('Artist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
});

router.route('/:id').delete((req, res) => {
  Artist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;