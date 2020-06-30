SELECT item_prices_wolf_armouries.item_id, wolf_armouries_price AS item_price, wolf_armouries_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_wolf_armouries
LEFT JOIN items
ON item_prices_wolf_armouries.item_id = items.item_id
WHERE wolf_armouries_discount > 0
AND items.item_category LIKE ?
AND items.item_manufacturer LIKE ?;