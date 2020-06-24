SELECT item_prices_land_warrior_airsoft.item_id, land_warrior_airsoft_price AS item_price, land_warrior_airsoft_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_land_warrior_airsoft
LEFT JOIN items
ON item_prices_land_warrior_airsoft.item_id = items.item_id
WHERE land_warrior_airsoft_discount > 0;