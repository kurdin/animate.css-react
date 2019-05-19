import createClass from 'create-react-class';
import { createElement } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import addClass from 'dom-helpers/class/addClass';
import removeClass from 'dom-helpers/class/removeClass';
import PropTypes from 'proptypes';

import ReactTransitionEvents from './React16TransitionEvents';

const TICK = 17;

var CSSTransitionGroupChild = createClass({
  displayName: 'CSSTransitionGroupChild',

  propTypes: {
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        enter: PropTypes.string,
        change: PropTypes.string,
        leave: PropTypes.string,
        active: PropTypes.string
      }),
      PropTypes.shape({
        enter: PropTypes.string,
        enterActive: PropTypes.string,
        change: PropTypes.string,
        changeActive: PropTypes.string,
        leave: PropTypes.string,
        leaveActive: PropTypes.string,
        appear: PropTypes.string,
        appearActive: PropTypes.string
      })
    ]).isRequired,

    // Once we require timeouts to be specified, we can remove the
    // boolean flags (appear etc.) and just accept a number
    // or a bool for the timeout flags (appearTimeout etc.)
    appear: PropTypes.bool,
    enter: PropTypes.bool,
    change: PropTypes.bool,
    leave: PropTypes.bool,
    appearTimeout: PropTypes.number,
    changeTimeout: PropTypes.number,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number
  },

  transition: function(animationType, finishCallback, userSpecifiedDelay) {
    var node = findDOMNode(this);

    if (!node || !this.props.animate) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timeout = null;

    var endListener = function(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timeout);

      removeClass(node, className);
      removeClass(node, activeClassName);

      ReactTransitionEvents.removeEndEventListener(node, endListener);

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    addClass(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClass(activeClassName);

    // If the user specified a timeout delay.
    if (userSpecifiedDelay) {
      // Clean-up the animation after the specified delay
      timeout = setTimeout(endListener, userSpecifiedDelay);
      this.transitionTimeouts.push(timeout);
    } else {
      ReactTransitionEvents.addEndEventListener(node, endListener);
    }
  },

  queueClass: function(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
    }
  },

  flushClassNameQueue: function() {
    if (!this.unmounted) {
      this.classNameQueue.forEach(addClass.bind(addClass, findDOMNode(this)));
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  componentWillMount: function() {
    this.classNameQueue = [];
    this.transitionTimeouts = [];
  },

  componentWillUpdate: function() {
    if (this.props.change && this.props.animateChangeIf) {
      this.transition('change', null, this.props.changeTimeout);
    }
  },

  componentWillUnmount: function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function(timeout) {
      clearTimeout(timeout);
    });
  },

  componentWillAppear: function(done) {
    if (this.props.appear) {
      this.transition('appear', done, this.props.appearTimeout);
    } else {
      done();
    }
  },

  componentWillEnter: function(done) {
    if (this.props.enter) {
      this.transition('enter', done, this.props.enterTimeout);
    } else {
      done();
    }
  },

  componentWillLeave: function(done) {
    if (this.props.leave) {
      this.transition('leave', done, this.props.leaveTimeout);
    } else {
      done();
    }
  },

  render: function() {
    return Array.isArray(this.props.children) ? this.props.children[0] : this.props.children;
  }
});

export default CSSTransitionGroupChild;
