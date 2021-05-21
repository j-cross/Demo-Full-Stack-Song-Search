const db = require('../db/sqlite');

module.exports = async (req, res) => {
    const result = await db.searchTracks(req.params.query);
    res.send(result);
};
