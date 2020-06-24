SELECT item_prices_redwolf_airsoft.item_id, redwolf_airsoft_price AS item_price, redwolf_airsoft_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_redwolf_airsoft
LEFT JOIN items
ON item_prices_redwolf_airsoft.item_id = items.item_id
ORDER BY redwolf_airsoft_discount DESC LIMIT 5