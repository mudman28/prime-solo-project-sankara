const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "candle" WHERE "isExperiment" = FALSE;`;
    pool.query(queryText).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in GET /api/candle`, error);
        res.sendStatus(500);
    });
});

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

// This route *should* add a pet for the logged in user
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


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "candle" WHERE id=$1', [req.params.id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE /api/candle', error);
        res.sendStatus(500);
    })
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/', (req, res) => {
    const updatedCandle = req.body;
  
    const queryText = `UPDATE "candle"
    SET "name", 
    "description", 
    "preparation", 
    "note"
    "amount_in_stock";`;
  
    const queryValues = [
    updatedCandle.name,
    updatedCandle.description,
    updatedCandle.preparation,
    updatedCandle.note,
    updatedCandle.amount_in_stock
    ];
    pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in PUT /api/candle', err);
      res.sendStatus(500);
    });
});

module.exports = router;
