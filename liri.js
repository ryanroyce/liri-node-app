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
//writing the spotify-this-song function to search Spotify's API and return the requested info to the command line
function spotThis() {
    // this piece of code is from the spotify API in the NPM information to check for errors and otherwise console.log the command input
    spotify.search({ type: 'track', query: search }, function (err, data) {
        // creating a variable to make it shorter to console.log the JSON data from spotify
        var spot = data.tracks;
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            // console logging all the JSON just like from the other APIs
            console.log("--------------------");
            console.log("Artist: " + spot.items[0].artists[0].name);
            console.log("Track Name: " + spot.items[0].name);
            console.log("Preview link: " + spot.items[0].preview_url);
            console.log("Album: " + spot.items[0].album.name);
            console.log("--------------------");
        };
    });
};
// do what it says function that will read the text in random.txt using the fs package!
function doWhatSays() {
    // passing the arguments required to .readFile like in previous in-class activities
    fs.readFile("random.txt", "utf8", function (error, data) {
        // checking for errors and if there isn't one it will console.log the data in random.txt
        if (error) {
            return console.log(error);
        }
        else {
            console.log(data);
        };

        // run the spotify-this-song function using the text that has been taken from the random.txt file
        function spotThis() {
            // creating a variable to store the data is in the random.txt file
            var randomTxt = data.split(",");
            // the only difference in this function is for the query argument we are passing out randomTxt variable instead of search like we did the first time we wrote this function
            spotify.search({ type: 'track', query: randomTxt[1] }, function (err, data) {
                var spot = data.tracks;
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                else {
                    console.log("--------------------");
                    console.log("Artist: " + spot.items[0].artists[0].name);
                    console.log("Track Name: " + spot.items[0].name);
                    console.log("Preview link: " + spot.items[0].preview_url);
                    console.log("Album: " + spot.items[0].album.name);
                    console.log("--------------------");
                }
            });
        };
        // calling the spotify-this-song function
        spotThis();
    })
};

// last but not least we have to write a switch statement instead of just running the functions like we had in previous commits
// for all cases it will read what is stored in the commands variable and if the string matches any of the cases it will run that specific function!
// so much easier than writing messy if else statements!
switch (commands) {
    case "movie-this":
        if (search.length === 0) {
            // mr. nobody as per the assignments details
            search = "mr+nobody";
            movieThis();
        } else {
            movieThis();
        };
        break;

    case "concert-this":
        concThis();
        break;

    case "spotify-this-song":
        if (search.length === 0) {
            // ace of base per the assignments readme
            search = "The Sign Ace of Base";
            spotThis();
        } else {
            spotThis();
        };
        break;

    case "do-what-it-says":
        doWhatSays()
        break;
};