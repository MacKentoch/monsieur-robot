// @flow
/* eslint-disable camelcase */
/* eslint-disable no-console */

// #region lib imports
const moment = require('moment');
const { join } = require('path');
const executeCmd = require('../utils/executeCmd');
const config = require('../../server/config');
const readMarkdown = require('../utils/readMarkdown');
const db = require('../../server/db');
const askConfirmation = require('../utils/askConfirmation');
const getPageDataFromJSON = require('../../scripts/utils/getPageDataFromJSON');
// #endregion

// #region constants
const dataJsonPath = join(__dirname, '../../db/data.json');
const warningMessage = 'You are about to load initial date to the database.';
// #endregion

askConfirmation(async confirmed => {
  if (confirmed) {
    console.log('database will be loaded...');
    await load();
    console.log('...database is now loaded');
    process.exit();
    return;
  }
  console.log('database load cancelled');
  process.exit();
}, warningMessage);

// #region load operation
async function load() {
  try {
    // #region 1st create db schema
    const schemaFile = join(__dirname, '../../', 'db/schema.sql');
    const command0 =
      config.get('env') === 'production'
        ? `psql --username postgres ${config.get('env')} < ${schemaFile}`
        : `psql --username postgres ${config.get('env')} < ${schemaFile}`;
    await executeCmd(command0, 'createSchema', true);
    // #endregion

    // #region base data import
    const dataFile = join(__dirname, '../../', 'db/base_data.sql');
    const command1 =
      config.get('env') === 'production'
        ? `psql --username postgres ${config.get('env')} < ${dataFile}`
        : `psql --username postgres ${config.get('env')} < ${dataFile}`;
    await executeCmd(command1, 'loadData', true);
    // #endregion

    // #region Home content
    const homeData = await getPageDataFromJSON(dataJsonPath, 'home');
    Object.keys(homeData).forEach(async homeKey => {
      console.log(`inserting home data key: ${homeKey} content`);
      const data = await getPageDataFromJSON(dataJsonPath, 'home');
      const { title, markdownContentFile } = data[homeKey];
      const mdLink = join(
        __dirname,
        `../../db/markdown/${markdownContentFile}.md`,
      );
      const mdContent = await readMarkdown(mdLink);

      const { rows } = await db.query(
        `INSERT INTO page_home (ui_part_key, title, md_content)
          VALUES (
            $1,
            $2,
            $3::text
          ) RETURNING id;`,
        [homeKey, title, mdContent],
      );

      console.log(
        `inserted home data key: ${homeKey} content id: `,
        rows[0].id,
      );
    });
    // #endregion

    // #region Blogs content
    const blogsData = await getPageDataFromJSON(dataJsonPath, 'blogs');

    const queries = Object.keys(blogsData).map(async blogKey => {
      console.log(`inserting blogs data key: ${blogKey} content`);
      const data = await getPageDataFromJSON(dataJsonPath, 'blogs');
      const {
        title,
        subtitle,
        summary,
        md_content,
        date_publication,
        date_format,
        author_id,
      } = data[blogKey];

      // markdown column content:
      const mdLink = join(__dirname, `../../db/markdown/${md_content}.md`);
      const mdContent = await readMarkdown(mdLink);

      // date_publication column formated:
      const date_publication_formatted = moment(
        date_publication,
        date_format || config.get('dateFormat'),
      );

      const { rows } = await db.query(
        `INSERT INTO blogs (
          title,
          subtitle,
          summary,
          md_content,
          date_publication,
          author
        )
          VALUES (
            $1,
            $2,
            $3,
            $4::text,
            $5,
            $6
          ) RETURNING id;`,
        [
          title,
          subtitle,
          summary,
          mdContent,
          date_publication_formatted,
          author_id,
        ],
      );

      console.log(
        `inserted blog data key: ${blogKey} content id: `,
        rows[0].id,
      );

      return Promise.resolve();
    });

    await Promise.all(queries);
    // #endregion
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
}
// #endregion
