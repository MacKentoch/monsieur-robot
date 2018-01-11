// @flow

// #region lib imports
const executeCmd = require('../utils/executeCmd');
const config = require('../../server/config');
const readMarkdown = require('../utils/readMarkdown');
const { join } = require('path');
const db = require('../../server/db');
const getPageDataFromJSON = require('../../scripts/utils/getPageDataFromJSON')
// #endregion

// #region constants
const dataJsonPath = join(__dirname, '../../db/data.json');
// #endregion

  async () => {
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

      // #region paragraphTopLeft content
      const { rows } = await db.query(
        `INSERT INTO blogs (title, subtitle, summary, md_content, author)
      VALUES (
        'Monsieur robot Website launch',
        $1::text,
        (SELECT id  FROM authors WHERE twitter_id = 'whoami')
      ) RETURNING id;`,
        [testMd],
      );
      console.log('test markdown insert id: ', rows[0].id);
      // #endregion

      // #endregion

      // #region 1st import from schema.sql
      const testMdPath = join(__dirname, '../markdown/test.md');
      const testMd = await readMarkdown(testMdPath);

      const { rows } = await db.query(
        `INSERT INTO blogs (title, subtitle, summary, md_content, author)
      VALUES (
        'Monsieur robot Website launch',
        'Brand new website for those aware of privacy',
        'A brief summary of this... Sorry no inspiration^^',
        $1::text,
        (SELECT id  FROM authors WHERE twitter_id = 'whoami')
      ) RETURNING id;`,
        [testMd],
      );
      console.log('test markdown insert id: ', rows[0].id);
      // #endregion
    } catch (error) {
      setTimeout(() => {
        throw error;
      });
    }
  },
)();
