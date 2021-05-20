const db = require('../db/sqlite');

module.exports = async (req, res) => {
    await db.updateItem(req.params.id, {
        name: req.body.name,
        inBasket: req.body.inBasket,
    });
    const item = await db.getItem(req.params.id);
    res.send(item);
};
