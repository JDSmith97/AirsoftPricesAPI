SELECT item_prices_skirmshop.item_id, skirmshop_price AS item_price, skirmshop_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_skirmshop
LEFT JOIN items
ON item_prices_skirmshop.item_id = items.item_id
WHERE skirmshop_discount > 0
AND items.item_category LIKE ?
AND items.item_manufacturer LIKE ?;