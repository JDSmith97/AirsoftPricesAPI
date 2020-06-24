SELECT item_prices_zero_one_airsoft.item_id, zero_one_airsoft_price AS item_price, zero_one_airsoft_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_zero_one_airsoft
LEFT JOIN items
ON item_prices_zero_one_airsoft.item_id = items.item_id
ORDER BY zero_one_airsoft_discount DESC LIMIT 5