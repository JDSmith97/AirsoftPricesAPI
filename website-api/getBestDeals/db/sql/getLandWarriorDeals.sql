SELECT item_id, land_warrior_airsoft_price AS item_price, land_warrior_airsoft_discount AS item_discount FROM 
   (SELECT * FROM item_prices_land_warrior_airsoft ORDER BY land_warrior_airsoft_discount DESC LIMIT 5) as myAlias 
ORDER BY land_warrior_airsoft_discount DESC