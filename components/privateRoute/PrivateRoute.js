// @flow

// #region imports
import React, {
  PureComponent
}                         from 'react';
import Router             from 'next/router';
import auth               from '../../services/auth';
// #endregion

// #region flow types
type Props = {
  fromPath: string,
  children: React$Node
}

type State = {
  checkDone: boolean
};
// #endregion

class Private extends PureComponent<Props, State> {
  // #region initializations
  static defaultProps = {
    fromPath: '/'
  };

  state = {
    checkDone: false
  };
  // #endregion

  // #region component lifecycle methods
  componentDidMount() {
    const {
      fromPath
    } = this.props;

    const userIsAuthenticated = this.isAuthenticated();
    const userTokenExpired =this.isExpired();

    const RoutePayload = {
      pathname: '/login',
      query: { from: fromPath }
    };

    if (!userIsAuthenticated) {
      return Router.replace(RoutePayload);
    }

    if (userTokenExpired) {
      return Router.replace(RoutePayload);
    }

    return true;
  }

  render() {
    const { children } = this.props;
    // const { checkDone } = this.state;

    // if (!checkDone) {
    //   return null;
    // }

    return (
      <div>
        {children}
      </div>
    );
  }
  // #endregion

  // #region set checkDone to unlock ui

  // #endregion

  // #region authentication check methods
  isAuthenticated(): boolean {
    const checkUserHasId  = user => ((user && user.id) || null);
    const user            = auth.getUserInfo() ? auth.getUserInfo() : null;
    const isAuthenticated = auth.getToken() && checkUserHasId(user) ? true : false;
    return isAuthenticated;
  }

  isExpired(): boolean {
    return auth.isExpiredToken(auth.getToken());
  }
  // #endregion
}

export default Private;
