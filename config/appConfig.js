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
      { id: 'home', label: 'News', link: '/', icon: require('material-ui-icons/Home') },
      { id: 'about', label: 'About', link: '/about', icon: require('material-ui-icons/Info') }
    ],
    defautTabMenuId: 'home',

    sidemenu: [
      { id: 'home', label: 'News', link: '/', icon: require('material-ui-icons/Home') },
      { id: 'about', label: 'About', link: '/about', icon: require('material-ui-icons/Info') }
    ]
  }
};

export default AppConfig;
