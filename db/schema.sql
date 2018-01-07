-- schema creation

--------------------------------------------
-- TABLES
--------------------------------------------

-- languages (other than default language english english)
CREATE TABLE languages
(
    id serial primary key,
    code VARCHAR(255) not null,
    name VARCHAR(255) not null
);
ALTER TABLE languages OWNER TO postgres;

--
CREATE TABLE authors
(
    id serial primary key,
    email VARCHAR(255) not null,
    nickname VARCHAR(255) not null,
    twitterId VARCHAR(255),
    date_creation TIMESTAMP NOT NULL default NOW()
);
ALTER TABLE languages OWNER TO postgres;


-- blogs (language is english)
CREATE TABLE blogs
(
    id serial primary key,
    title VARCHAR(255) not null,
    subTitle VARCHAR(255) not null,
    md_content TEXT not null,
    date_publication TIMESTAMP NOT NULL default NOW(),
    author INTEGER
);
ALTER TABLE blogs OWNER TO postgres;

-- blogs translations (other than default language english english)
CREATE TABLE blogs_translations
(
    id serial primary key,
    blog_id INTEGER REFERENCES blogs (id),
    lang_id INTEGER REFERENCES blogs (id),
    title VARCHAR(255) not null,
    subTitle VARCHAR(255) not null,
    md_content TEXT not null,
    date_publication TIMESTAMP NOT NULL default NOW()
);
ALTER TABLE blogs_translations OWNER TO postgres;


-- newsLetters (language is english)
CREATE TABLE newsLetters
(
    id serial primary key,
    creation_date TIMESTAMP NOT NULL default NOW(),
    submission_date DATE,
    md_content TEXT not null
);
ALTER TABLE newsLetters OWNER TO postgres;

-- newsLettersSubscribers (language is english)
CREATE TABLE newsLettersSubscribers
(
    id serial primary key,
    firtsname VARCHAR(255) not null,
    lastname VARCHAR(255) not null,
    email VARCHAR(255) not null,
    subscribtion_date TIMESTAMP NOT NULL default NOW(),
    unsubscribtion_date TIMESTAMP
);
ALTER TABLE newsLettersSubscribers OWNER TO postgres;

