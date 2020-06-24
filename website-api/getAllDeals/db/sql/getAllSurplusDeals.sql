SELECT item_prices_surplus_store.item_id, surplus_store_price AS item_price, surplus_store_discount AS item_discount, items.item_name, items.item_image FROM 
item_prices_surplus_store
LEFT JOIN items
ON item_prices_surplus_store.item_id = items.item_id
WHERE surplus_store_discount > 0;