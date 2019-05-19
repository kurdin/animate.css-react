import { TransitionGroup } from 'react-transition-group';

import CSSTransitionGroupChild from './React16CSSTransitionGroupChild';
import createClass from 'create-react-class';
import { createElement } from 'react';

const assign = require('object-assign');

var Inferno = {
  createClass,
  PropTypes: require('proptypes'),
  createElement
};

function createTransitionTimeoutPropValidator(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function(props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(
          timeoutPropName +
            " wasn't supplied to React16CSSTransitionGroup: " +
            "this can cause unreliable animations and won't be supported in " +
            'a future version of React. See ' +
            'https://fb.me/react-animation-transition-group-timeout for more ' +
            'information.'
        );

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }
  };
}

var React16CSSTransitionGroup = createClass({
  displayName: 'React16CSSTransitionGroup',

  propTypes: {
    transitionName: CSSTransitionGroupChild.propTypes.name,
    transitionChange: Inferno.PropTypes.bool,
    transitionAppear: Inferno.PropTypes.bool,
    transitionEnter: Inferno.PropTypes.bool,
    transitionLeave: Inferno.PropTypes.bool,
    transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
    transitionChangeTimeout: createTransitionTimeoutPropValidator('Change'),
    transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
    transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave')
  },

  getDefaultProps: function(props) {
    return {
      transitionAppear: false,
      transitionEnter: true,
      transitionChange: false,
      transitionLeave: true
    };
  },

  _wrapChild: function(child) {
    let transitionChange = this.props.transitionName.changeActive ? true : false;
    let transitionAppear = this.props.transitionName.appearActive ? true : false;
    let transitionEnter = this.props.transitionName.enterActive ? true : false;
    let transitionLeave = this.props.transitionName.leaveActive ? true : false;

    return createElement(
      CSSTransitionGroupChild,
      {
        key: child.key,
        name: this.props.transitionName,
        appear: transitionAppear,
        enter: transitionEnter,
        change: transitionChange,
        animate: this.props.animate,
        animateChangeIf: this.props.animateChangeIf,
        leave: transitionLeave,
        changeTimeout: this.props.transitionChangeTimeout,
        appearTimeout: this.props.transitionAppearTimeout,
        enterTimeout: this.props.transitionEnterTimeout,
        leaveTimeout: this.props.transitionLeaveTimeout
      },
      child
    );
  },

  render: function() {
    var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    var props = _objectWithoutProperties(this.props, [
      'animate',
      'animateChangeIf',
      'transitionChangeTimeout',
      'transitionChange'
    ]);
    let el = createElement(TransitionGroup, assign({}, props, { childFactory: this._wrapChild }), children);

    return el;
  }
});

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

export default React16CSSTransitionGroup;
