-- initial data to feed newly created DATABASE

-- 1 language for starting
INSERT INTO languages (code, name)
VALUES 
(
  'en', 
  'English'
);

-- 1 famous author for starting
INSERT INTO authors (nickname, twitter_id)
VALUES(
  'whoami', 
  'whoami'
);
