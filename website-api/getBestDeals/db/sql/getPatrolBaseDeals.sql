SELECT item_id, patrol_base_price AS item_price, patrol_base_discount AS item_discount FROM 
   (SELECT * FROM item_prices_patrol_base ORDER BY patrol_base_discount DESC LIMIT 5) as myAlias 
ORDER BY patrol_base_discount DESC