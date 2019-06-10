const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//the route to get all of the pending orders
router.get('/', (req, res) => {
  pool.query(`SELECT "order"."id" AS "order_id",
    to_char("order_date", 'MM/DD/YYYY') AS "order_date", 
    "first_name", "last_name", 
    "street_address", "city", "state", "zip",
    array_agg("candle_order"."quantity") AS "quantities", 
    array_agg("candle"."name") AS "candles",
    "isCompleted"
    FROM "order"
    JOIN "candle_order" ON "order"."id"="candle_order"."order_id"
    JOIN "candle" ON "candle"."id"="candle_order"."candle_id"
    WHERE "isCompleted" = FALSE
    GROUP BY ("order"."id")
    ORDER BY ("order_date") ASC;
    `)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /api/order', error)
      res.sendStatus(500);
    })
});

//the route to get all of the completed orders
router.get('/complete', (req, res) => {
  pool.query(`SELECT "order"."id" AS "order_id",
  to_char("order_date", 'MM/DD/YYYY') AS "order_date", 
  "first_name", "last_name", 
  "street_address", "city", "state", "zip",
  array_agg("candle_order"."quantity") AS "quantities", 
  array_agg("candle"."name") AS "candles",
  "isCompleted"
  FROM "order"
  JOIN "candle_order" ON "order"."id"="candle_order"."order_id"
  JOIN "candle" ON "candle"."id"="candle_order"."candle_id"
  WHERE "isCompleted" = TRUE
  GROUP BY ("order"."id")
  ORDER BY ("order_date") DESC;
  `)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /api/order', error)
      res.sendStatus(500);
    })
});

//the route to post orders
router.post('/', (req, res) => {
  const newOrder = req.body.orders;
  const newCandles = req.body.candles
  console.log(req.body);

  const queryText = `
      INSERT INTO "order" ("order_date", "first_name", "last_name", "street_address", "city", "state", "zip") 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
      `
  pool.query(queryText, [newOrder.order_date, newOrder.first_name, newOrder.last_name, newOrder.street_address, newOrder.city, newOrder.state, newOrder.zip])
    .then((result) => {
      
      //makes sure that all my candle info for each array is being put into my database and waiting to complete
      Promise.all(newCandles.map((title, i) => {
        const queryText2 = `
      INSERT INTO "candle_order" ("order_id", "candle_id", "quantity") 
      VALUES ($1, $2, $3);
      `
        return pool.query(queryText2, [result.rows[0].id, title.id, title.quantity]).then((result) => {
          
        }).catch((error) => {
          console.log(`Error in POST /api/order`, error);
          res.sendStatus(500);
        })
      })).then( () => {
        res.sendStatus(201)
      })
  })
})

  //the route to delete orders
  router.put('/:id', (req, res) => {
    const updatedOrder = req.body;

    const queryText = `UPDATE "order"
  SET "isCompleted" = $1 WHERE id=$2 ;`

    const queryValues = [
      updatedOrder.isCompleted, req.params.id
    ];
    pool.query(queryText, queryValues).then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error in PUT /api/candle', err);
        res.sendStatus(500);
      });
  });
  module.exports = router;