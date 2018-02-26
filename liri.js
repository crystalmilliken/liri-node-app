
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');
var colors = require('colors');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
const userInput = process.argv[2];

if (userInput === "my-tweets") {
    client.get('statuses/user_timeline.json', function (error, tweets, response) {
        if (error) throw error;
        let colors = ["blue", "red", "green", "yellow", "cyan", "magenta"];
        let count = 0;
        let arrayOfData = [];
        for (let i = 0; i < 10; i++) {
            if (count === colors.length) {
                count = 0;
            }
            console.log(tweets[i].text[colors[count]]);
            arrayOfData.push(tweets[i].text);
            count++;
        }
        writeStuff(arrayOfData);
    });
    
} else if (userInput === "spotify-this-song") {
    const songName = process.argv[3];
    spotify
        .request(`https://api.spotify.com/v1/search?q="${songName}&type=track`)
        .then(function (data) {
            const artistName = data.tracks.items[0].artists[0].name;
            const trackName = data.tracks.items[0].name;
            const linkName = data.tracks.items[0].external_urls.spotify;
            const albumName = data.tracks.items[0].album.name;
            console.log("******************************************");
            console.log("******************************************");
            console.log(`Artist: ${artistName}`.green);
            console.log(`Song title: ${trackName}`.red);
            console.log(`Link: ${linkName}`.cyan);
            console.log(`Album name: ${albumName}`.magenta);
            console.log("******************************************");
            console.log("******************************************");
            const arrayOfData = [artistName, trackName, linkName, albumName]

            writeStuff(arrayOfData);
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
} else if (userInput === "movie-this") {
    let requestedMovie = process.argv[3];
    let url;
    if (requestedMovie === "null") {
        requestedMovie = "Mr. Nobody"
        url = `http://www.omdbapi.com/?apikey=a66dd38&t=${requestedMovie}`
    } else {
        url = `http://www.omdbapi.com/?apikey=a66dd38&t=${requestedMovie}`
    }
    request(url, function (err, response, body) {
        const movie = JSON.parse(body);
        const title = movie.Title;
        const year = movie.Year;
        const imdbRating = movie.imdbRating;
        let rottenTomatoes = "";
        const country = movie.Country;
        const language = movie.Language;
        const plot = movie.Plot;
        const actors = movie.Actors;
        let arrayOfData = [title, year, imdbRating, country, language, plot, actors];
        console.log(`Title: ${title}`.red);
        console.log(`Year Released: ${year}`.green);
        console.log(`Imdb rating: ${imdbRating}`.yellow);
        movie.Ratings.forEach((x) => {
            if (x.Source === "Rotten Tomatoes") {
                rottenTomatoes = x.Value;
                arrayOfData.splice(3, 0, x.Value);
                console.log(`Rotten Tomatoes rating: ${rottenTomatoes}`.magenta);

            }
        })
        console.log(`Country where the movie was produced: ${country}`.red)
        console.log(`Language: ${language}`.blue);
        console.log(`Plot: ${plot}`.green);
        console.log(`Actors: ${actors}`.yellow);
        writeStuff(arrayOfData)
    })

} else if (userInput === "do-what-it-says") {
    fs.readFile("./random.txt", 'utf8', function (err, response) {
        response = response.split(",");
        const song = response[1];
        const url = `https://api.spotify.com/v1/search?q="${song}&type=track`
        if (err) throw err;
        spotify.request(url)
            .then(function (data) {
                const artistName = data.tracks.items[0].artists[0].name;
                const trackName = data.tracks.items[0].name;
                const linkName = data.tracks.items[0].external_urls.spotify;
                const albumName = data.tracks.items[0].album.name;
                console.log("******************************************");
                console.log("******************************************");
                console.log(`Artist: ${artistName}`.green);
                console.log(`Song title: ${trackName}`.red);
                console.log(`Link: ${linkName}`.cyan);
                console.log(`Album name: ${albumName}`.magenta);
                console.log("******************************************");
                console.log("******************************************");
                const arrayOfData = [artistName, trackName, linkName, albumName]
                writeStuff(arrayOfData);

            })

            .catch(function (err) {
                console.log(err)
            })
    })
} else {
    console.log("I'm sorry, didn't quite understand your request, try me again!")
}
function writeStuff(arrayOfData) {
    let i;
    fs.appendFile("log.txt", "\n", "utf8", function (response) {
    })
    for (i = 0; i < arrayOfData.length; i++) {
        let line = `\n${arrayOfData[i]}`
        fs.appendFile("log.txt", line, "utf8", function (response) {
        })
    }
}