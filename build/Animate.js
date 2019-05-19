'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React16CSSTransitionGroup = require('./libs/React16CSSTransitionGroup');

var _React16CSSTransitionGroup2 = _interopRequireDefault(_React16CSSTransitionGroup);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _proptypes = require('proptypes');

var _proptypes2 = _interopRequireDefault(_proptypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          _props$durationChange = _props.durationChange,
          durationChange = _props$durationChange === undefined ? 1000 : _props$durationChange,
          change = _props.change,
          appear = _props.appear,
          _props$durationAppear = _props.durationAppear,
          durationAppear = _props$durationAppear === undefined ? 1000 : _props$durationAppear,
          enter = _props.enter,
          leave = _props.leave,
          _props$durationEnter = _props.durationEnter,
          durationEnter = _props$durationEnter === undefined ? 1000 : _props$durationEnter,
          _props$durationLeave = _props.durationLeave,
          durationLeave = _props$durationLeave === undefined ? 1000 : _props$durationLeave,
          _props$animateChangeI = _props.animateChangeIf,
          animateChangeIf = _props$animateChangeI === undefined ? true : _props$animateChangeI,
          _props$animate = _props.animate,
          animate = _props$animate === undefined ? true : _props$animate,
          others = _objectWithoutProperties(_props, ['children', 'durationChange', 'change', 'appear', 'durationAppear', 'enter', 'leave', 'durationEnter', 'durationLeave', 'animateChangeIf', 'animate']);

      change = change === 'false' ? false : change;
      animate = animate === 'false' ? false : animate;
      animateChangeIf = animateChangeIf === 'false' ? false : animateChangeIf;
      appear = appear === 'false' ? false : appear;
      enter = enter === 'false' ? false : enter;
      leave = leave === 'false' ? false : leave;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('style', {
          dangerouslySetInnerHTML: {
            __html: this.renderStyle({
              change: change,
              durationChange: durationChange,
              appear: appear,
              durationAppear: durationAppear,
              enter: enter,
              leave: leave,
              durationEnter: durationEnter,
              durationLeave: durationLeave
            })
          }
        }),
        _react2.default.createElement(
          _React16CSSTransitionGroup2.default,
          _extends({
            component: 'div',
            animate: animate,
            animateChangeIf: animateChangeIf,
            transitionName: {
              appear: 'default-appear',
              appearActive: appear,
              change: 'default-change',
              changeActive: change,
              enter: 'default-enter',
              enterActive: enter,
              leave: 'default-leave',
              leaveActive: leave
            },
            transitionEnterTimeout: durationEnter,
            transitionChangeTimeout: durationChange,
            transitionLeaveTimeout: durationLeave,
            transitionAppearTimeout: durationAppear
          }, others),
          children
        )
      );
    }
  }, {
    key: 'renderStyle',
    value: function renderStyle(_ref) {
      var change = _ref.change,
          appear = _ref.appear,
          enter = _ref.enter,
          leave = _ref.leave,
          durationChange = _ref.durationChange,
          durationAppear = _ref.durationAppear,
          durationEnter = _ref.durationEnter,
          durationLeave = _ref.durationLeave;

      return '\n        ' + (change && '\n        .default-change {\n          opacity: 0;\n        }\n    \n        .default-change.' + change + ' {\n          animation-duration: ' + durationChange / 1000 + 's;\n          animation-fill-mode: both;\n          opacity: 1;\n        }' || '') + '\n\n        ' + (appear && '\n        .default-appear {\n          opacity: 0;\n        }\n    \n        .default-appear.' + appear + ' {\n          animation-duration: ' + durationAppear / 1000 + 's;\n          animation-fill-mode: both;\n          opacity: 1;\n        }' || '') + '\n        \n        ' + (enter && '\n        .default-enter {\n          opacity: 0;\n        }\n\n        .default-enter.' + enter + ' {\n          animation-duration: ' + durationEnter / 1000 + 's;\n          animation-fill-mode: both;\n          opacity: 1;\n        }' || '') + '\n\n        ' + (leave && '\n        .default-leave {\n          opacity: 1;\n        }\n\n        .default-leave.' + leave + ' {\n          animation-duration: ' + durationLeave / 1000 + 's;\n          animation-fill-mode: both;\n        }\n        }' || '') + '\n        ';
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;