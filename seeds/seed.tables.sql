BEGIN;

TRUNCATE
  "user",
  "save";

INSERT INTO "user" ("email", "username", "password" )
VALUES 
  (
    'demo@email.com',
    'demo',
    '5f4dcc3b5aa765d61d8327deb882cf99'
  ),
  (
    'admin@email.com',
    'admin',
    '5f4dcc3b5aa765d61d8327deb882cf99'
  );

  INSERT INTO "save" ("trail_id", "user_id", "date_saved", "name", "summary", "difficulty", "stars", "votes", "location", "url", "img", "length", "ascent", "longitude", "latitude")
  VALUES
    (
      7011192, 1, '2020-11-15T18:12:34Z', 'Boulder Skyline Traverse', 'The classic long mountain route in Boulder.', 'black', 4.7, 87, 'Superior, Colorado', 'https:\/\/www.hikingproject.com\/trail\/7011192\/boulder-skyline-traverse', 'https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_medium_1555092747.jpg', 17.4, 5480, -105.2582, 39.9388
    );

COMMIT;


