SELECT item_prices_bullseye_country_sport.item_id, bullseye_country_sport_price AS item_price, bullseye_country_sport_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_bullseye_country_sport
LEFT JOIN items
ON item_prices_bullseye_country_sport.item_id = items.item_id
WHERE bullseye_country_sport_discount > 0;