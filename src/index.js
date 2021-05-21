const express = require('express');
const app = express();
const db = require('./db/sqlite');
const searchTracks = require('./routes/searchTracks');
const getTracks = require('./routes/getTracks');

app.use(require('body-parser').json());
app.use(express.static(__dirname + '/static'));

app.get('/tracks/:query', searchTracks);
app.get('/tracks', getTracks);

db.init().then(() => {
  app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
  console.error(err);
  process.exit(1);
});