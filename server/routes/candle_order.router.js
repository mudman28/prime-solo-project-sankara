const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "candle_order"`;
    pool.query(queryText).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in GET /api/candle_order`, error);
        res.sendStatus(500);
    });
});

// This route *should* add a pet for the logged in user
router.post('/', (req, res) => {
    const newCandle = req.body;
    const queryText2 = `
    INSERT INTO "candle_order" ("order_id", "candle_id", "quantity") 
      VALUES ($1, $2, $3);
      `
    pool.query(queryText2, [newCandle.order_id, newCandle.candle_id, newCandle.quantity])
    .then((result) => {
      console.log(result.rows);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(`Error in POST /api/candle_order`, error);
      res.sendStatus(500);
    })
})

router.put('/', (req, res) => {
    const updatedCandle = req.body;
  
    const queryText = `UPDATE "candle_order"
    SET "order_id", 
    "candle_id", 
    "quantity";`;
  
    const queryValues = [
    updatedCandle.order_id,
    updatedCandle.candle_id,
    updatedCandle.quantity,
    ];
    pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in PUT /api/candle_order', err);
      res.sendStatus(500);
    });
});

module.exports = router;