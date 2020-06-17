SELECT item_id, bullseye_country_sport_price AS item_price, bullseye_country_sport_discount AS item_discount FROM 
   (SELECT * FROM item_prices_bullseye_country_sport ORDER BY bullseye_country_sport_discount DESC LIMIT 5) as myAlias 
ORDER BY bullseye_country_sport_discount DESC