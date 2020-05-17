DELETE FROM item_prices_surplus_store
WHERE EXISTS
  (SELECT *
   FROM (SELECT * FROM item_prices_surplus_store) AS item_prices_surplus_store
   WHERE item_prices_surplus_store.item_id = ?);