const db = require('../db/sqlite');

module.exports = async (req, res) => {
    const items = await db.getTracks();
    res.send(items);
};
