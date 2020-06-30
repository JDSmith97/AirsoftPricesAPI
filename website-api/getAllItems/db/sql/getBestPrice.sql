SELECT *
FROM items
LEFT JOIN item_prices_patrol_base ON items.item_id = item_prices_patrol_base.item_id
LEFT JOIN item_prices_surplus_store ON items.item_id = item_prices_surplus_store.item_id
LEFT JOIN item_prices_redwolf_airsoft ON items.item_id = item_prices_redwolf_airsoft.item_id
LEFT JOIN item_prices_zero_one_airsoft ON items.item_id = item_prices_zero_one_airsoft.item_id
LEFT JOIN item_prices_airsoft_world ON items.item_id = item_prices_airsoft_world.item_id
LEFT JOIN item_prices_land_warrior_airsoft ON items.item_id = item_prices_land_warrior_airsoft.item_id
LEFT JOIN item_prices_fire_support ON items.item_id = item_prices_fire_support.item_id
LEFT JOIN item_prices_wolf_armouries ON items.item_id = item_prices_wolf_armouries.item_id
LEFT JOIN item_prices_skirmshop ON items.item_id = item_prices_skirmshop.item_id
LEFT JOIN item_prices_bullseye_country_sport ON items.item_id = item_prices_bullseye_country_sport.item_id
WHERE
  items.item_id = ?
