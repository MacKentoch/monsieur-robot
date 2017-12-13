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
      { id: 'home', label: 'Home', link: '/', icon: require('material-ui-icons/Home') },
      { id: 'protected', label: 'Protected', link: '/protected', icon: require('material-ui-icons/Lock') },
      { id: 'about', label: 'About', link: '/about', icon: require('material-ui-icons/Info') }
    ],
    defautTabMenuId: 'home',

    sidemenu: [
      { id: 'home', label: 'Home', link: '/', icon: require('material-ui-icons/Home') },
      { id: 'protected', label: 'Protected', link: '/protected', icon: require('material-ui-icons/Lock') },
      { id: 'about', label: 'About', link: '/about', icon: require('material-ui-icons/Info') }
    ]
  }
};

export default AppConfig;
