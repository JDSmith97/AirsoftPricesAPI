DELETE FROM item_prices_patrol_base
WHERE EXISTS
  (SELECT *
   FROM (SELECT * FROM item_prices_patrol_base) AS item_prices_patrol_base
   WHERE item_prices_patrol_base.item_id = ?);