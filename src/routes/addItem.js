const db = require('../db/sqlite');
const uuid = require('uuid/v4');

module.exports = async (req, res) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        inBasket: false,
    };

    await db.storeItem(item);
    res.send(item);
};
