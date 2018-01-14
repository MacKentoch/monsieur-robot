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

-- authors
CREATE TABLE authors
(
    id serial primary key,
    email VARCHAR(255), -- not mandatory (staying anonymous can be better)
    nickname VARCHAR(255) NOT NULL,
    twitter_id VARCHAR(255),
    date_creation TIMESTAMP NOT NULL DEFAULT NOW()
);


-- blogs (language is english)
CREATE TABLE blogs
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    md_content TEXT NOT NULL,
    date_publication TIMESTAMP NOT NULL DEFAULT NOW(),
    author INTEGER REFERENCES authors (id) NOT NULL
);

-- blogs translations (other than default language english english)
CREATE TABLE blogs_translations
(
    id SERIAL PRIMARY KEY,
    blog_id INTEGER REFERENCES blogs (id) NOT NULL,
    lang_id INTEGER REFERENCES languages (id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    md_content TEXT NOT NULL,
    date_publication TIMESTAMP NOT NULL DEFAULT NOW()
);


-- newsLetters (language is english)
CREATE TABLE newsletters
(
    id SERIAL PRIMARY KEY,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    submission_date TIMESTAMP,
    md_content TEXT NOT NULL
);

-- newsLettersSubscribers (language is english)
CREATE TABLE newsletters_subscribers
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subscribtion_date TIMESTAMP NOT NULL DEFAULT NOW(),
    unsubscribtion_date TIMESTAMP
);


-- page (UI) HOME (or index)
CREATE TABLE page_home
(
    id SERIAL PRIMARY KEY,
    ui_part_key VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    md_content TEXT NOT NULL,
    edit_date TIMESTAMP NOT NULL DEFAULT NOW()
);