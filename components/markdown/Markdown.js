// @flow

// #region imports
import React, { PureComponent } from 'react';
import marked from 'marked';
// #endregion

// #region flow types
type Props = {
  // parent:
  text: string,
  ...any,
};

type State = {
  ...any,
};
// #endregion

// #region init marked
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});
// #endregion

class Markdown extends PureComponent<Props, State> {
  static defaultProps = {
    text: '',
  };

  // #region lifecycle
  render() {
    const { text } = this.props;
    const html = marked(text || '');

    return (
      <span>
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </span>
    );
  }
  // #endregion
}

export default Markdown;
