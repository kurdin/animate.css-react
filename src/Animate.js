import React16CSSTransitionGroup from './libs/React16CSSTransitionGroup';
import React, { Component } from 'react';

import PropTypes from 'proptypes';

export default class extends Component {
  render() {
    let {
      children,
      durationChange = 1000,
      change,
      appear,
      durationAppear = 1000,
      enter,
      leave,
      durationEnter = 1000,
      durationLeave = 1000,
      animateChangeIf = true,
      animate = true,
      ...others
    } = this.props;

    change = change === 'false' ? false : change;
    animate = animate === 'false' ? false : animate;
    animateChangeIf = animateChangeIf === 'false' ? false : animateChangeIf;
    appear = appear === 'false' ? false : appear;
    enter = enter === 'false' ? false : enter;
    leave = leave === 'false' ? false : leave;

    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: this.renderStyle({
              change,
              durationChange,
              appear,
              durationAppear,
              enter,
              leave,
              durationEnter,
              durationLeave
            })
          }}
        />

        <React16CSSTransitionGroup
          component="div"
          animate={animate}
          animateChangeIf={animateChangeIf}
          transitionName={{
            appear: 'default-appear',
            appearActive: appear,
            change: 'default-change',
            changeActive: change,
            enter: 'default-enter',
            enterActive: enter,
            leave: 'default-leave',
            leaveActive: leave
          }}
          transitionEnterTimeout={durationEnter}
          transitionChangeTimeout={durationChange}
          transitionLeaveTimeout={durationLeave}
          transitionAppearTimeout={durationAppear}
          {...others}
        >
          {children}
        </React16CSSTransitionGroup>
      </div>
    );
  }

  renderStyle({ change, appear, enter, leave, durationChange, durationAppear, durationEnter, durationLeave }) {
    return `
        ${(change &&
          `
        .default-change {
          opacity: 0;
        }
    
        .default-change.${change} {
          animation-duration: ${durationChange / 1000}s;
          animation-fill-mode: both;
          opacity: 1;
        }`) ||
          ''}

        ${(appear &&
          `
        .default-appear {
          opacity: 0;
        }
    
        .default-appear.${appear} {
          animation-duration: ${durationAppear / 1000}s;
          animation-fill-mode: both;
          opacity: 1;
        }`) ||
          ''}
        
        ${(enter &&
          `
        .default-enter {
          opacity: 0;
        }

        .default-enter.${enter} {
          animation-duration: ${durationEnter / 1000}s;
          animation-fill-mode: both;
          opacity: 1;
        }`) ||
          ''}

        ${(leave &&
          `
        .default-leave {
          opacity: 1;
        }

        .default-leave.${leave} {
          animation-duration: ${durationLeave / 1000}s;
          animation-fill-mode: both;
        }
        }`) ||
          ''}
        `;
  }
}
