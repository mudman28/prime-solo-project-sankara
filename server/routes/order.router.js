const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//  Get all of the pending orders in the order table
router.get('/', (req, res) => {
    pool.query(`SELECT 
    to_char("order_date", 'MM/DD/YYYY'), 
    "cust_name", "address", 
    array_agg("candle_order"."quantity") AS "quantities", 
    array_agg("candle"."name") AS "candles"
    FROM "order"
    JOIN "candle_order" ON "order"."id"="candle_order"."order_id"
    JOIN "candle" ON "candle"."id"="candle_order"."candle_id"
    WHERE "isCompleted" = FALSE
    GROUP BY ("order"."id");
    `)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /api/order', error)
        res.sendStatus(500);
    })
});

//  Get all of the completed orders in the order table
router.get('/complete', (req, res) => {
  pool.query(`SELECT 
  to_char("order_date", 'MM/DD/YYYY'), 
  "cust_name", "address", 
  array_agg("candle_order"."quantity") AS "quantities", 
  array_agg("candle"."name") AS "candles"
  FROM "order"
  JOIN "candle_order" ON "order"."id"="candle_order"."order_id"
  JOIN "candle" ON "candle"."id"="candle_order"."candle_id"
  WHERE "isCompleted" = TRUE
  GROUP BY ("order"."id");
  `)
  .then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log('Error in GET /api/order', error)
      res.sendStatus(500);
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    const newOrder = req.body;
    const queryText = `
    INSERT INTO "order" ("order_date", "cust_name", "address") 
      VALUES ($1, $2, $3) RETURNING id;
      `
    pool.query(queryText, [newOrder.order_date, newOrder.cust_name, newOrder.address])
    .then((result) => {
      const queryText2 = `
      INSERT INTO "candle_order" ("order_id", "candle_id", "quantity") 
      VALUES ($1, $2, $3);
      `
    pool.query(queryText2, [newCandle.order_id, newCandle.candle_id, newCandle.quantity])
    .then((result) => {
      console.log(result.rows);
      res.sendStatus(201);
    })
      console.log(result.rows);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(`Error in POST /api/order`, error);
      res.sendStatus(500);
    })
  })


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "order" WHERE id=$1', [req.params.id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE /api/order', error);
        res.sendStatus(500);
    })
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/', (req, res) => {
    const updatedOrder = req.body;
    const queryText = `UPDATE "order"
    SET "order_date" = $1, 
    "cust_name" = $2, 
    "address" = $3, 
    WHERE id=$4;`;
    const queryValues = [
    updatedOrder.order_date,
    updatedOrder.cust_name,
    updatedOrder.address,
    ];
    pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in PUT /api/order', err);
      res.sendStatus(500);
    });
});


module.exports = router;