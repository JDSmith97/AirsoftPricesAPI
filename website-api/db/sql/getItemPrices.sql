SELECT *
FROM items
INNER JOIN item_prices_patrol_base ON items.item_id = item_prices_patrol_base.item_id
INNER JOIN item_prices_surplus_store ON items.item_id = item_prices_surplus_store.item_id
WHERE
  items.item_id = ?
