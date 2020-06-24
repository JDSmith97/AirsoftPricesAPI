SELECT item_prices_patrol_base.item_id, patrol_base_price AS item_price, patrol_base_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_patrol_base
LEFT JOIN items
ON item_prices_patrol_base.item_id = items.item_id
WHERE patrol_base_discount > 0;