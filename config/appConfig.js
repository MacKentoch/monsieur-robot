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
      { id: 'about', label: 'About Tides', link: '/about' },
      { id: 'blog', label: 'Blog', link: '/blog' },
      { id: 'article', label: 'Article', link: '/article' },
      { id: 'newsletter', label: 'Newsletter', link: '/newsletter' },
      { id: 'press', label: 'Press', link: '/press' },
      { id: 'contact', label: 'Contact', link: '/contact' },
    ],
    defautTabMenuId: 'home'
  }
};

export default AppConfig;
