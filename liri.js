// connecting all the packages and linking the spotify keys that we will need for this assigment
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// user input variables for CLI
var commands = process.argv[2];
var search = process.argv.slice(3).join(" ");

//writing the movie-this function to search the OMDB API and return the requested info to the command line
function movieThis() {
    // storing the API data into a variable
    var movieUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    // making an axios call and then logging the data for the title, year, rating, rotten tomatoes rating, language, plot and actors
    axios.get(movieUrl).then(
        function (response) {
            console.log("--------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value);
            console.log("Country: " + response.data.Country);
            console.log("Language " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("--------------------");
        });
};
//writing the movie-this function to search the Band's In Town API and return the requested info to the command line
function concThis() {
    // just like the OMDB call we use the came axios call to get the concert's information from the JSON data that gets returned.
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp&date=upcoming").then(
        function (response) {
            // using a for loop we itterate through all of the tour dates and print to the command line the requested data via console.log
            for (i = 0; i < response.data.length; i++) {
                console.log("--------------------")
                console.log("Artist: " + search)
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city);
                // utilizing the Moment package we convert the concert dates to MM/DD/YYYY per the assignments readme.
                console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'))
                console.log("--------------------");
            };
        });
};

movieThis();
concThis();
