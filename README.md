# liri-node-app

## **This application was created to perform 3 main actions.**
1. Access my Twitter account and return the most recent 10 tweets.
2. Make a request to Spotify based on user requested song and return the following data: 
    * Arist name
    * Song title
    * Preview link of the song from Spotify
    * Album name
3. Make a request to OMDB API based on the user requested movie and return the following data: 
    * Title
    * Year Released
    * IMDB rating
    * Rotten Tomatoes
    * Rating
    * Country where it was produced,
    * Language
    * Plot
    * Actors
## Commands

1. "my-tweets"
2. "spotify-this-song"
3. "movie-this"
4. "do-what-it-says"

## Examples
- Input:
> node liri "spotify-this-song" "Remember"
>
Response would be data about "Remember"
- Input:
> node liri "movie-this" "IT"
>
Response would be data about the movie "IT"

## Packages used
1. colors - https://www.npmjs.com/package/colors
2. dotenv - https://www.npmjs.com/package/dotenv
3. node-spotify-api - https://www.npmjs.com/package/node-spotify-api
4. request- https://www.npmjs.com/package/request
5. spotify - https://www.npmjs.com/package/spotify
6. twitter - https://apps.twitter.com/app/new

## To use
1. clone repo
2. install dependencies
3. create an .env file containing environment variables:
####Spotify API keys
SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

####Twitter API keys
TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
4. Change the variables to match your keys
5. Make sure to add .env file to your .gitignore if uploading to Github

