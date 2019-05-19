import React, { Component } from 'react';
import PropTypes from 'proptypes';

import animations from './animations';

export default class Select extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    enter: PropTypes.string.isRequired,
    leave: PropTypes.string.isRequired,
    change: PropTypes.string.isRequired,
    durationEnter: PropTypes.number.isRequired,
    durationLeave: PropTypes.number.isRequired,
    durationChange: PropTypes.number.isRequired
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="three columns">
            <label htmlFor="animationEnter">Animation Enter</label>
            <select
              name="animationEnter"
              value={this.props.enter}
              onChange={e => this.props.onChange('enter', e.target.value)}
            >
              {animations.map(animation => (
                <option key={animation.name} value={animation.name}>
                  {animation.name}
                </option>
              ))}
            </select>
          </div>

          <div className="three columns">
            <label htmlFor="durationEnter">Duration Enter</label>
            <input
              type="text"
              defaultValue={this.props.durationEnter}
              onChange={e => this.props.onChange('durationEnter', parseInt(e.target.value == '' ? 0 : e.target.value))}
            />
          </div>

          <div className="three columns">
            <label htmlFor="animationLeave">Animation Leave</label>
            <select
              name="animationLeave"
              defaultValue={this.props.leave}
              onChange={e => this.props.onChange('leave', e.target.value)}
            >
              {animations.map(animation => (
                <option key={animation.name} value={animation.name}>
                  {animation.name}
                </option>
              ))}
            </select>
          </div>

          <div className="three columns">
            <label htmlFor="durationLeave">Duration Leave</label>
            <input
              type="text"
              defaultValue={this.props.durationLeave}
              onChange={e => this.props.onChange('durationLeave', parseInt(e.target.value == '' ? 0 : e.target.value))}
            />
          </div>
        </div>
        <div className="row">
          <div className="three columns">
            <label htmlFor="animationEnter">Animation on Change</label>
            <select
              name="animationChange"
              defaultValue={this.props.change}
              onChange={e => this.props.onChange('change', e.target.value)}
            >
              {animations.map(animation => (
                <option key={animation.name} value={animation.name}>
                  {animation.name}
                </option>
              ))}
            </select>
          </div>

          <div className="three columns">
            <label htmlFor="durationLeave">Duration on Change</label>
            <input
              type="text"
              defaultValue={this.props.durationChange}
              onChange={e => this.props.onChange('durationChange', parseInt(e.target.value == '' ? 0 : e.target.value))}
            />
          </div>
        </div>
      </div>
    );
  }

  handleChange(e, prop) {
    let result = {};
    result[prop] = e.target.value;
    this.props.onChange(result);
  }
}
