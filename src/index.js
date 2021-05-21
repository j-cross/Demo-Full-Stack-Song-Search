const express = require('express');
const app = express();
const db = require('./db/sqlite');
const searchTracks = require('./routes/searchTracks');
const getTracks = require('./routes/getTracks');

// A simple server to interface the API with a SQLite database of song information
app.use(require('body-parser').json());
app.use(express.static(__dirname + '/static'));

// One API endpoint which will return all songs with name and id
// If a parameter is passed to the endpoint it will return only songs with the search term in it's title
app.get('/tracks/:query', searchTracks);
app.get('/tracks', getTracks);

// Initialize the database and start the server on port 3000
db.init().then(() => {
  app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
  console.error(err);
  process.exit(1);
});