var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models/");

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/articles");

app.get("/scrape", function(req, res) {

    axios.get("https://www.premierleague.com/news/").then(function(response) {

        var $ = cheerio.load(response.data);
        $("li section").each(function(i, element) {
            console.log(element)
            var result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.img = $(this)
                .children("img")
                .attr("src");
            result.text = $(this)
                .children("span")
                .attr("text");
            // db.Article.create(result)
            // .then(function(dbArticle) {
            //     console.log(dbArticle);
            // })
            // .catch(function(err) {
            //     return res.json(err);
            // });
            console.log(result)
        });

        res.send("Scrape Complete");
    });

}); 

app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  

  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  