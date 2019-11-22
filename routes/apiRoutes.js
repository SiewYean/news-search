const axios = require("axios");
const router = require("express").Router();
const db = require("../models");

const newsapi_key = "34bc630dd910456a93a1a7b5496009e2";
var newsapiQuery = "";

router.get("/article/:title", (req, res) => {
  var title = req.params.title.replace(/\s+/g, "+");
  console.log(`http://marquisdegeek.com/api/country/?name=${req.params.title}&closest`);
  axios
    .get(`http://marquisdegeek.com/api/country/?name=${req.params.title}&closest`)
    .then((response) => {
      if (response.data.length !== 0) {
        var countryAlpha2Code = response.data[0].id;
        newsapiQuery = `https://newsapi.org/v2/top-headlines?country=${countryAlpha2Code}&apiKey=${newsapi_key}`;
      }
      else {
        newsapiQuery = `https://newsapi.org/v2/everything?q=${req.params.title}&apiKey=${newsapi_key}`;
      }
      console.log(newsapiQuery);
      axios
        .get(newsapiQuery)
        .then(({data}) => {
          console.log(data.articles.length);
          if (data.articles.length === 0 && newsapiQuery.includes("top-headlines")) {
            newsapiQuery = `https://newsapi.org/v2/everything?q=${req.params.title}&apiKey=${newsapi_key}`;
              console.log(newsapiQuery);
              axios
                .get(newsapiQuery)
                .then(({data}) => {
                  res.json(data);
                })     
                .catch(err => {
                  res.status(422).json(err);
                  alert('API limit exceeded');
                });
          }
          else {
            res.json(data);
          }})
            .catch(err => {
            res.status(422).json(err);
            alert('API limit exceeded');
        });
    })
    .catch(err => {
      console.error(`${err}`);
      alert('API limit exceeded');
  });
});

router.post("/article", (req, res) => {
  db.Article.create(req.body).then(response => res.json(response))
  .catch(err => res.json(err));
});

router.get("/article", (req, res) => {
  db.Article.find({}).then(response => {
    res.json(response)})
  .catch(err => res.json(err));
});

router.delete("/article/:id", (req, res) => {
  var id = req.params.id;
  db.Article.deleteOne({_id:id}).then(response => {
    res.json(response)
  }).catch(err => res.json(res));
});

router.delete("/article", (req, res) => {
  db.Article.remove({ }).then(response => {
    res.json(response)
  }).catch(err => res.json(res));
});

module.exports = router;
