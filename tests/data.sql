INSERT INTO categories (id, alias, title, parents, whitelist, blacklist)
VALUES
  (NULL, 'tio', 'Tio Style', 'restaurants', NULL, 'UK,CA,AU,US'),
  (NULL, 'poor', 'Poor Mans', 'restaurants', NULL, NULL),
  (NULL, 'leaf', 'Leaf Only', 'restaurants', 'UK,TR,US', NULL);