SELECT item_id, skirmshop_price AS item_price, skirmshop_discount AS item_discount FROM 
   (SELECT * FROM item_prices_skirmshop ORDER BY skirmshop_discount DESC LIMIT 5) as myAlias 
ORDER BY skirmshop_discount DESC