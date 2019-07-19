const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// this route gets the candle information
router.get('/', (req, res) => {
    let queryText = 
    `SELECT * FROM "candle" 
    WHERE "isExperiment" = FALSE
    ORDER BY ("candle"."id") DESC;`;
    pool.query(queryText).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in GET /api/candle`, error);
        res.sendStatus(500);
    });
});

// this route gets the experiment information
router.get('/experiment', (req, res) => {
    let queryText = `SELECT * FROM "candle" WHERE "isExperiment" = TRUE;`;
    pool.query(queryText).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in GET /api/candle`, error);
        res.sendStatus(500);
    });
});

//this route posts new candles
router.post('/', (req, res) => {
    const newCandle = req.body;
    const queryText = `
    INSERT INTO "candle" ("name", "description", "preparation", "note") 
      VALUES ($1, $2, $3, $4);
      `
    pool.query(queryText, [newCandle.name, newCandle.description, newCandle.preparation, newCandle.note])
    .then((result) => {
      console.log(result.rows);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(`Error in POST /api/candle`, error);
      res.sendStatus(500);
    })
})


//this route deletes a candle 
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "candle" WHERE id=$1', [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE /api/candle', error);
        res.sendStatus(500);
    })
});


//this route updates candle information
router.put('/:id', (req, res) => {
    const updatedCandle = req.body;
  
    const queryText = `UPDATE "candle"
    SET "name" = $1, 
    "description" = $2, 
    "preparation" = $3, 
    "note" = $4,
    "amount_in_stock" = $5 WHERE id=$6;`;
  
    const queryValues = [
    updatedCandle.name,
    updatedCandle.description,
    updatedCandle.preparation,
    updatedCandle.note,
    updatedCandle.amount_in_stock,
    req.params.id
    ];
    pool.query(queryText, queryValues).then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in PUT /api/candle', err);
      res.sendStatus(500);
    });
});

//this route updates candle inventory when an order is completed
router.put('/inventory/:id', (req, res) => {
    const updatedCandle = req.body;
  
    const queryText = `UPDATE "candle"
    SET "amount_in_stock" = $1 
    WHERE id=$2;`;
  
    const queryValues = [updatedCandle.amount_in_stock, req.params.id];
    pool.query(queryText, queryValues).then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in PUT /api/candle', err);
      res.sendStatus(500);
    });
});
module.exports = router;
