SELECT item_id, airsoft_world_price AS item_price, airsoft_world_discount AS item_discount FROM 
   (SELECT * FROM item_prices_airsoft_world ORDER BY airsoft_world_discount DESC LIMIT 5) as myAlias 
ORDER BY airsoft_world_discount DESC