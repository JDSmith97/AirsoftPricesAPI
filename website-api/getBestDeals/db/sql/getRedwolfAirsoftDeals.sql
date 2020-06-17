SELECT item_id, redwolf_airsoft_price AS item_price, redwolf_airsoft_discount AS item_discount FROM 
   (SELECT * FROM item_prices_redwolf_airsoft ORDER BY redwolf_airsoft_discount DESC LIMIT 5) as myAlias 
ORDER BY redwolf_airsoft_discount DESC