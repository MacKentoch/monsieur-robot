-- initial data to feed newly created DATABASE

-- 1 language for starting
INSERT INTO languages (code, name)
VALUES 
(
  'en', 
  'English'
);

-- 1 famous author for starting
INSERT INTO authors (nickname, twitterid)
VALUES(
  'whoami', 
  'whoami'
);

-- 1st blog ever may be about the fides project website launch
INSERT INTO blogs (title, subTitle, md_content, author)
VALUES (
    'Monsieur robot Website launch', 
    'Brand new website for those aware of privacy',
 	'# Monsieur Robot \n## Whatis is about \n>Some explanations won''t hurt\n\nA bit more to say... etc...',
    (SELECT id  FROM authors WHERE twitterid = 'whoami')
);


