SELECT item_id, fire_support_price AS item_price, fire_support_discount AS item_discount FROM 
   (SELECT * FROM item_prices_fire_support ORDER BY fire_support_discount DESC LIMIT 5) as myAlias 
ORDER BY fire_support_discount DESC