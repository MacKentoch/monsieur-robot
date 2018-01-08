-- schema creation

--------------------------------------------
-- TABLES
--------------------------------------------

-- languages (other than default language english english)
CREATE TABLE languages
(
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);
ALTER TABLE languages OWNER TO postgres;

-- authors
CREATE TABLE authors
(
    id serial primary key,
    email VARCHAR(255), -- not mandatory (staying anonymous can be better)
    nickname VARCHAR(255) NOT NULL,
    twitterId VARCHAR(255),
    date_creation TIMESTAMP NOT NULL DEFAULT NOW()
);
ALTER TABLE authors OWNER TO postgres;


-- blogs (language is english)
CREATE TABLE blogs
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subTitle VARCHAR(255) NOT NULL,
    md_content TEXT NOT NULL,
    date_publication TIMESTAMP NOT NULL DEFAULT NOW(),
    author INTEGER REFERENCES authors (id) NOT NULL
);
ALTER TABLE blogs OWNER TO postgres;

-- blogs translations (other than default language english english)
CREATE TABLE blogs_translations
(
    id SERIAL PRIMARY KEY,
    blog_id INTEGER REFERENCES blogs (id) NOT NULL,
    lang_id INTEGER REFERENCES languages (id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    subTitle VARCHAR(255) NOT NULL,
    md_content TEXT NOT NULL,
    date_publication TIMESTAMP NOT NULL DEFAULT NOW()
);
ALTER TABLE blogs_translations OWNER TO postgres;


-- newsLetters (language is english)
CREATE TABLE newsLetters
(
    id SERIAL PRIMARY KEY,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    submission_date TIMESTAMP,
    md_content TEXT NOT NULL
);
ALTER TABLE newsLetters OWNER TO postgres;

-- newsLettersSubscribers (language is english)
CREATE TABLE newsLettersSubscribers
(
    id SERIAL PRIMARY KEY,
    firtsname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subscribtion_date TIMESTAMP NOT NULL DEFAULT NOW(),
    unsubscribtion_date TIMESTAMP
);
ALTER TABLE newsLettersSubscribers OWNER TO postgres;
