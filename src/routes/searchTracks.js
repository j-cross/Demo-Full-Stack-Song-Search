const db = require('../db/sqlite');

module.exports = async (req, res) => {
    const items = await db.searchTracks(req.params.query);
    res.send(items);
};
