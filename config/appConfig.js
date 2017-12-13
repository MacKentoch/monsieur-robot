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
      { id: 'home', label: 'Home', link: '/' },
      { id: 'community', label: 'Community', link: '/community' },
      { id: 'article', label: 'Article', link: '/article' },
      { id: 'about', label: 'About', link: '/about' }
    ],
    defautTabMenuId: 'home'
  }
};

export default AppConfig;
