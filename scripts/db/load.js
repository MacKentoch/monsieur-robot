// @flow

// #region lib imports
const executeCmd = require('../utils/executeCmd');
const config = require('../../server/config');
const readMarkdown = require('../utils/readMarkdown');
const { join } = require('path');
const db = require('../../server/db');
const getPageDataFromJSON = require('../../scripts/utils/getPageDataFromJSON');
// #endregion

// #region constants
const dataJsonPath = join(__dirname, '../../db/data.json');
// #endregion

(async () => {
  try {
    // #region 1st create db schema
    const command0 =
      config.get('env') === 'production'
        ? `psql --username postgres ${config.get('env')} < db/schema.sql`
        : `psql --username postgres ${config.get('env')} < db/schema.sql`;
    await executeCmd(command0, 'createSchema', true);
    // #endregion

    // #region base data import
    const command1 =
      config.get('env') === 'production'
        ? `psql --username postgres ${config.get('env')} < db/base_data.sql`
        : `psql --username postgres ${config.get('env')} < db/base_data.sql`;
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
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
})();
