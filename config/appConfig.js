// @flow

const AppConfig = {
  // flag: set fetch mock or real fetch
  DEV_MODE: true,

  // API
  api: {
    fakeEndPoint: 'api/somewhere',
  },

  // navigation
  navigation: {
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
