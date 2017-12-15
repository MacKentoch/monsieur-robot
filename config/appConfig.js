// @flow

const AppConfig = {
  // flag: set fetch mock or real fetch
  DEV_MODE: true,

  // API
  api: {
    fakeEndPoint: 'api/somewhere'
  },

  // navigation
  navigation: {
    // tab navigation
    tabMenu: [
      { id: '/', label: 'Home', link: '/' },
      { id: '/about', label: 'About Fides', link: '/about' },
      { id: '/blog', label: 'Blog', link: '/blog' }, // index is blog
      { id: '/newsletter', label: 'Newsletter', link: '/newsletter' },
      { id: '/press', label: 'Press', link: '/press' },
      { id: '/contact', label: 'Contact', link: '/contact' },
    ],
    defautTabMenuId: '/'
  }
};

export default AppConfig;
