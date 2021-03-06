// @flow
import classnames from 'classnames';
import * as React from 'react';
import { autoBindMethodsForReact } from 'class-autobind-decorator';
import { AUTOBIND_CFG } from '../../../common/constants';
import * as misc from '../../../common/misc';

type Props = {|
  href: string,
  title?: string,
  button?: boolean,
  onClick?: Function,
  className?: string,
  children?: React.Node,
  disabled?: boolean,
  noTheme?: boolean,
|};

@autoBindMethodsForReact(AUTOBIND_CFG)
class Link extends React.PureComponent<Props> {
  _handleClick(e: SyntheticEvent<HTMLAnchorElement>) {
    e && e.preventDefault();
    const { href, onClick } = this.props;

    // Also call onClick that was passed to us if there was one
    onClick && onClick(e);

    misc.clickLink(href);
  }

  render() {
    const {
      onClick, // eslint-disable-line no-unused-vars
      button,
      href,
      children,
      className,
      disabled,
      noTheme,
      ...other
    } = this.props;
    return button ? (
      <button onClick={this._handleClick} className={className} {...other}>
        {children}
      </button>
    ) : (
      <a
        href={href}
        onClick={this._handleClick}
        className={classnames(className, { 'theme--link': !noTheme })}
        disabled={disabled}
        {...other}>
        {children}
      </a>
    );
  }
}

export default Link;
