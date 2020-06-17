SELECT item_id, zero_one_airsoft_price AS item_price, zero_one_airsoft_discount AS item_discount FROM 
   (SELECT * FROM item_prices_zero_one_airsoft ORDER BY zero_one_airsoft_discount DESC LIMIT 5) as myAlias 
ORDER BY zero_one_airsoft_discount DESC