// @flow
/* eslint no-process-env:0 */

/**
 * add event listener beforeinstallprompt: PWA prompt user install app (add to screen)
 * @returns {Function} module
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = async () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', async e => {
        // beforeinstallprompt Event fired
        try {
          // e.userChoice will return a Promise.
          const choiceResult = await e.userChoice;
          if (choiceResult.outcome === 'dismissed') {
            /* eslint-disable no-console */
            console.log('User cancelled home screen install');
            /* eslint-enable no-console */
          } else {
            /* eslint-disable no-console */
            console.log('User added to home screen');
            /* eslint-enable no-console */
          }
        } catch (error) {
          /* eslint-disable no-console */
          console.error(
            'user choice prompt promise failed to resolve, error: ',
            error,
          );
          /* eslint-enable no-console */
        }
      });
    }
  };
} else {
  // no sw in dev or test mode (sw-precache-webpack-plugin won't work in dev - it is not compatible with web dev server)
  module.exports = () => {};
}
