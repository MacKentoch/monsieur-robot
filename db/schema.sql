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



-- blogs (language is english)
CREATE TABLE blogs
(
    id serial primary key,
    title VARCHAR(255) not null,
    subTitle VARCHAR(255) not null,
    md_content TEXT not null,
    date_publication DATE not null
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
    date_publication DATE not null
);
ALTER TABLE blogs_translations OWNER TO postgres;


-- newsLetters (language is english)
CREATE TABLE newsLetters
(
    id serial primary key,
    creation_date DATE not NULL,
    submission_date DATE,
    md_content TEXT not null
);
ALTER TABLE newsLetters OWNER TO postgres;

-- newsLettersSubscribers (language is english)
CREATE TABLE newsLettersSubscribers
(
    id serial primary key,
    firtsname: VARCHAR(255) not null,
    lastname: VARCHAR(255) not null,
    email: VARCHAR(255) not null,
    subscribtion_date DATE not NULL,
    unsubscribtion_date DATE
);
ALTER TABLE newsLettersSubscribers OWNER TO postgres;

