// @flow

// #region imports
import React, { PureComponent } from 'react';
import cx from 'classnames';
// #endregion

// #region configutation constants
const defaultBackGroundColor = '#111';
const sideOffset = '20px';
const bottomOffset = '8px';
const defaultWidth = '50px';
const defaultZindex = 10;
const defaultOpacity = 0.7;
const defaultStyle = {
  position: 'fixed',
  right: sideOffset,
  left: '',
  bottom: bottomOffset,
  width: defaultWidth,
  zIndex: defaultZindex,
  opacity: defaultOpacity,
  backgroundColor: defaultBackGroundColor,
};
// #endregion

// #region flow types
type ComponentStyle = {
  position: 'fixed' | 'absolute' | 'relative',
  right: string,
  left: string,
  bottom: string,
  width: string,
  zIndex: number,
  opacity: number,
  backgroundColor: string,
};

type Position = 'bottom-left' | 'bottom-right';

type MotionStyle = {
  transform: string,
  WebkitTransform: string,
};

type Props = {
  position: Position,
  onClick: () => any,
  children: any,
  motionStyle: MotionStyle,
  ...any,
};

type State = any;
// #endregion

class BackToTopButton extends PureComponent<Props, State> {
  static defaultProps = {
    position: 'bottom-right',
  };

  // #region lifecycle
  render() {
    const { onClick, position, children, motionStyle } = this.props;

    const buttonStyle = this.setPosition(position, {
      ...motionStyle,
      ...defaultStyle,
    });

    return (
      <button
        style={buttonStyle}
        className={cx({
          btn: true,
        })}
        onClick={onClick}
      >
        {!children && (
          <div style={{ marginRight: '0px' }}>
            <i
              style={{ color: '#F1F1F1' }}
              className="fa fa-arrow-up"
              aria-hidden="true"
            />
          </div>
        )}
        {!!children && children}
      </button>
    );
  }
  // #endregion

  // #region compute button style depending parametized position prop
  setPosition(
    position: Position = 'bottom-right',
    refStyle: ComponentStyle = defaultStyle,
  ): ComponentStyle {
    const style = { ...refStyle };

    switch (position) {
      case 'bottom-right':
        style.right = sideOffset;
        style.left = '';
        return style;

      case 'bottom-left':
        style.right = '';
        style.left = sideOffset;
        return style;

      default:
        return refStyle;
    }
  }
  // #endregion
}

export default BackToTopButton;
