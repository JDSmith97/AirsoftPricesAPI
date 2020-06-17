SELECT item_id, surplus_store_price AS item_price, surplus_store_discount AS item_discount FROM 
   (SELECT * FROM item_prices_surplus_store ORDER BY surplus_store_discount DESC LIMIT 5) as myAlias 
ORDER BY surplus_store_discount DESC