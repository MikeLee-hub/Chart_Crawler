const Crawler = require('crawler')

let chart_url_map = new Map();
chart_url_map.set('Billboard Hot 100', '/charts/hot-100/');
chart_url_map.set('Billboard Global 200', '/charts/billboard-global-200/');
chart_url_map.set('Billboard 200', '/charts/billboard-200/');


class BillboardCrawler {
    constructor () {
        this.crawler = new Crawler()
        this.baseUrl = 'https://www.billboard.com';
    }

    getChart (chartName = 'Billboard Hot 100', date, artists) {
        return new Promise((resolve, reject) => {
            const answer_array = [];
            const url = this.baseUrl + chart_url_map.get(chartName) + date;
            if(chartName == 'Billboard Global 200'){
                var year = Number(date.substring(0, 4));
                if(year < 2020){
                    resolve(answer_array);
                    return [];
                }
                if(year == 2020){
                    var month = Number(date.substring(5, 7));
                    if (month < 9){
                        resolve(answer_array);
                        return [];
                    }
                }
            }
            this.crawler.direct({
                uri: url,
                callback: function (err, res, done) {
                    if (err) {
                        reject(err)
                    } 
                    else {
                        const $ = res.$
                        const chartlist = $('.o-chart-results-list-row');

                        chartlist.each(function(i, element) {
                            const tmp_artistname = $('.lrv-u-width-100p',this).find('.c-label').first().text();
                            let tmp_artistname1 = tmp_artistname.replace(/\n/g, '');
                            let artistName = tmp_artistname1.replace(/\t/g, '');
                            const idx = artists.findIndex((element, index, array) => {
                                return element === artistName;
                            });
                            if (idx != -1){
                                const tmp_songname = $('#title-of-a-story',this).text();
                                let tmp_songname1 = tmp_songname.replace(/\n/g, '');
                                let songName = tmp_songname1.replace(/\t/g, '');
            
                                var query = {
                                    artistname: artistName,
                                    songname: songName,
                                    chartname: chartName,
                                    rank: i+1,
                                    date: date,
                                }
                                answer_array.push(query);
                                console.log(query);
                            };
                        })
                        resolve(answer_array);
                    }
                }
            })
        })
    }

}

module.exports = BillboardCrawler