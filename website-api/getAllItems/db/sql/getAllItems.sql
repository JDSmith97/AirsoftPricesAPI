SELECT item_id, item_name, item_image FROM 
items
WHERE items.item_category LIKE ?
AND items.item_manufacturer LIKE ?; 