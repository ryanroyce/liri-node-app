### Overview

In this assignment, we created LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Challenges
*creating keys to access spotify APIs data as well as Band's In Town and OMDB.<br>
*storing the API keys in a keys.js file that requires .env file that has the information in it.<br>
*utilizing a .gitignore to hide the keys from Github.<br>
*using Node Package Manager to install several packages including:fs, axios, moment, and spotify<br>
*using moment to convert the concert dates into MM/DD/YYYY format.<br>
*taking information from a .txt file and turning it into a string and then using that string to make an API call to display JSON data<br>
*utilizing switch statements to take CLI input and when the input is made a given function will run.

### How to use LIRI
The following are the commands you can give LIRI in the command line:<br>

node liri.js movie-this 'input movie title here'<br>
node liri.js movie this<br>
node liri.js concert-this 'input band name here'<br>
node liri.js spotify-this-song 'input song name here'<br>
node liri.js do-what-it-says<br>


To see this and other projects go to: https://ryanroyce.github.io/portfolio/