const db = require('../db/sqlite');

module.exports = async (req, res) => {
    console.log('req', req.params.query);
    const items = await db.searchTracks(req.params.query);
    res.send(items);
};
