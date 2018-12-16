// connecting all the packages and linking the spotify keys that we will need for this assigment
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// user input in CLI
var commands = process.argv[2];
var search = process.argv.slice(3).join(" ");

//writing the movie-this function
function movieThis() {
    // storing the API data into a variable
    var movieUrl = "http://www.omdbapi.com/?t=" +search+ "&y=&plot=short&apikey=trilogy";
    // making an axios call and then logging the data for the title, year, rating, rotten tomatoes rating, language, plot and actors
    axios.get(movieUrl).then(
        function (response) {
            console.log("------------------------------")
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value);
            console.log("Country: " + response.data.Country);
            console.log("Language " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("------------------------------")
        });

    }; 
    // calling the movie this function
    movieThis ();
