'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _addClass = require('dom-helpers/class/addClass');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('dom-helpers/class/removeClass');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _proptypes = require('proptypes');

var _proptypes2 = _interopRequireDefault(_proptypes);

var _React16TransitionEvents = require('./React16TransitionEvents');

var _React16TransitionEvents2 = _interopRequireDefault(_React16TransitionEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TICK = 17;

var CSSTransitionGroupChild = (0, _createReactClass2.default)({
  displayName: 'CSSTransitionGroupChild',

  propTypes: {
    name: _proptypes2.default.oneOfType([_proptypes2.default.string, _proptypes2.default.shape({
      enter: _proptypes2.default.string,
      change: _proptypes2.default.string,
      leave: _proptypes2.default.string,
      active: _proptypes2.default.string
    }), _proptypes2.default.shape({
      enter: _proptypes2.default.string,
      enterActive: _proptypes2.default.string,
      change: _proptypes2.default.string,
      changeActive: _proptypes2.default.string,
      leave: _proptypes2.default.string,
      leaveActive: _proptypes2.default.string,
      appear: _proptypes2.default.string,
      appearActive: _proptypes2.default.string
    })]).isRequired,

    // Once we require timeouts to be specified, we can remove the
    // boolean flags (appear etc.) and just accept a number
    // or a bool for the timeout flags (appearTimeout etc.)
    appear: _proptypes2.default.bool,
    enter: _proptypes2.default.bool,
    change: _proptypes2.default.bool,
    leave: _proptypes2.default.bool,
    appearTimeout: _proptypes2.default.number,
    changeTimeout: _proptypes2.default.number,
    enterTimeout: _proptypes2.default.number,
    leaveTimeout: _proptypes2.default.number
  },

  transition: function transition(animationType, finishCallback, userSpecifiedDelay) {
    var node = (0, _reactDom.findDOMNode)(this);

    if (!node || !this.props.animate) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timeout = null;

    var endListener = function endListener(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timeout);

      (0, _removeClass2.default)(node, className);
      (0, _removeClass2.default)(node, activeClassName);

      _React16TransitionEvents2.default.removeEndEventListener(node, endListener);

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    (0, _addClass2.default)(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClass(activeClassName);

    // If the user specified a timeout delay.
    if (userSpecifiedDelay) {
      // Clean-up the animation after the specified delay
      timeout = setTimeout(endListener, userSpecifiedDelay);
      this.transitionTimeouts.push(timeout);
    } else {
      _React16TransitionEvents2.default.addEndEventListener(node, endListener);
    }
  },

  queueClass: function queueClass(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
    }
  },

  flushClassNameQueue: function flushClassNameQueue() {
    if (!this.unmounted) {
      this.classNameQueue.forEach(_addClass2.default.bind(_addClass2.default, (0, _reactDom.findDOMNode)(this)));
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  componentWillMount: function componentWillMount() {
    this.classNameQueue = [];
    this.transitionTimeouts = [];
  },

  componentWillUpdate: function componentWillUpdate() {
    if (this.props.change && this.props.animateChangeIf) {
      this.transition('change', null, this.props.changeTimeout);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });
  },

  componentWillAppear: function componentWillAppear(done) {
    if (this.props.appear) {
      this.transition('appear', done, this.props.appearTimeout);
    } else {
      done();
    }
  },

  componentWillEnter: function componentWillEnter(done) {
    if (this.props.enter) {
      this.transition('enter', done, this.props.enterTimeout);
    } else {
      done();
    }
  },

  componentWillLeave: function componentWillLeave(done) {
    if (this.props.leave) {
      this.transition('leave', done, this.props.leaveTimeout);
    } else {
      done();
    }
  },

  render: function render() {
    return Array.isArray(this.props.children) ? this.props.children[0] : this.props.children;
  }
});

exports.default = CSSTransitionGroupChild;