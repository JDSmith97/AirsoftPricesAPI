SELECT item_prices_fire_support.item_id, fire_support_price AS item_price, fire_support_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_fire_support
LEFT JOIN items
ON item_prices_fire_support.item_id = items.item_id
WHERE fire_support_discount > 0;