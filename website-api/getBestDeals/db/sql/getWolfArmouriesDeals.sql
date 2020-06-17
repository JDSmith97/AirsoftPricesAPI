SELECT item_id, wolf_armouries_price AS item_price, wolf_armouries_discount AS item_discount FROM 
   (SELECT * FROM item_prices_wolf_armouries ORDER BY wolf_armouries_discount DESC LIMIT 5) as myAlias 
ORDER BY wolf_armouries_discount DESC