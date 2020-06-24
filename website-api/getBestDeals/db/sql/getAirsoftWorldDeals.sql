SELECT item_prices_airsoft_world.item_id, airsoft_world_price AS item_price, airsoft_world_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_airsoft_world
LEFT JOIN items
ON item_prices_airsoft_world.item_id = items.item_id
ORDER BY airsoft_world_discount DESC LIMIT 5