// @flow

const AppConfig = {
  // flag: set fetch mock or real fetch
  DEV_MODE: true,

  appName: 'The Fides Project',

  baseUrl: {
    dev: 'http://localhost:3001',
    prod: 'https://monsieur-robot.herokuapp.com',
  },

  // API
  api: {
    fakeEndPoint: 'api/somewhere',
  },

  discord: {
    clientId: '',
    clientSecret: '',
  },

  // navigation
  navigation: {
    // about sub navigation
    about: {
      root: { label: 'about 1', link: '/about' },
      sub: [{ label: 'about 1', link: '/about' }],
    },

    // tab navigation
    tabMenu: [
      { id: '/', label: 'Home', link: '/', pageTitle: 'The Fides Project' },
      {
        id: '/about',
        label: 'About Fides',
        link: '/about',
        pageTitle: 'About Fides Project',
      },
      { id: '/blog', label: 'Blog', link: '/blog', pageTitle: 'Blog' }, // index is blog
      {
        id: '/newsletter',
        label: 'Newsletter',
        link: '/newsletter',
        pageTitle: 'Newsletter',
      },
      { id: '/press', label: 'Press', link: '/press', pageTitle: 'Press' },
      {
        id: '/contact',
        label: 'Contact',
        link: '/contact',
        pageTitle: 'Contact',
      },
    ],
    defautTabMenuId: '',
  },
};

export default AppConfig;
