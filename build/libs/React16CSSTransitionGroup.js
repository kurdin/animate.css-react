'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactTransitionGroup = require('react-transition-group');

var _React16CSSTransitionGroupChild = require('./React16CSSTransitionGroupChild');

var _React16CSSTransitionGroupChild2 = _interopRequireDefault(_React16CSSTransitionGroupChild);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign = require('object-assign');

var Inferno = {
  createClass: _createReactClass2.default,
  PropTypes: require('proptypes'),
  createElement: _react.createElement
};

function createTransitionTimeoutPropValidator(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + " wasn't supplied to React16CSSTransitionGroup: " + "this can cause unreliable animations and won't be supported in " + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }
  };
}

var React16CSSTransitionGroup = (0, _createReactClass2.default)({
  displayName: 'React16CSSTransitionGroup',

  propTypes: {
    transitionName: _React16CSSTransitionGroupChild2.default.propTypes.name,
    transitionChange: Inferno.PropTypes.bool,
    transitionAppear: Inferno.PropTypes.bool,
    transitionEnter: Inferno.PropTypes.bool,
    transitionLeave: Inferno.PropTypes.bool,
    transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
    transitionChangeTimeout: createTransitionTimeoutPropValidator('Change'),
    transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
    transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave')
  },

  getDefaultProps: function getDefaultProps(props) {
    return {
      transitionAppear: false,
      transitionEnter: true,
      transitionChange: false,
      transitionLeave: true
    };
  },

  _wrapChild: function _wrapChild(child) {
    var transitionChange = this.props.transitionName.changeActive ? true : false;
    var transitionAppear = this.props.transitionName.appearActive ? true : false;
    var transitionEnter = this.props.transitionName.enterActive ? true : false;
    var transitionLeave = this.props.transitionName.leaveActive ? true : false;

    return (0, _react.createElement)(_React16CSSTransitionGroupChild2.default, {
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
    }, child);
  },

  render: function render() {
    var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    var props = _objectWithoutProperties(this.props, ['animate', 'animateChangeIf', 'transitionChangeTimeout', 'transitionChange']);
    var el = (0, _react.createElement)(_reactTransitionGroup.TransitionGroup, assign({}, props, { childFactory: this._wrapChild }), children);

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

exports.default = React16CSSTransitionGroup;