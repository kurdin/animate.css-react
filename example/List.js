import React, { Component } from 'react';
import PropTypes from 'proptypes';

import uuid from 'uuid';

import Animate from 'react16-animate.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: uuid.v4(),
          name: 'item 1'
        },
        {
          id: uuid.v4(),
          name: 'item 2'
        },
        {
          id: uuid.v4(),
          name: 'item 3'
        }
      ]
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  removeItem(id) {
    const items = this.state.items;
    const index = items.findIndex(item => item.id == id);
    this.setState({
      items: [...items.slice(0, index), ...items.slice(index + 1)]
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let ref = this.inputItem;
    if (ref && !ref.value.trim()) return;

    this.setState(
      {
        items: [
          {
            id: uuid.v4(),
            name: ref.value
          },
          ...this.state.items
        ]
      },
      () => {
        if (ref) ref.value = '';
      }
    );
  }

  onRandom(e) {
    e.preventDefault();
    let ref = this.inputItem;
    let items = this.state.items;
    let insertAt = getRndInteger(0, items.length);
    items.insert(insertAt, {
      id: uuid.v4(),
      name: randomString(10)
    });
    this.setState({ items });
  }

  render() {
    return (
      <div className="row" style={{ width: 400 }}>
        <div className="row" style={{ marginTop: 50 }}>
          <form onSubmit={this.onSubmit}>
            <div className="six columns">
              {
                <Animate appear="fadeIn" component="div">
                  <input
                    style={{ width: 195 }}
                    type="text"
                    placeholder="Enter New Item"
                    ref={r => (this.inputItem = r)}
                  />
                </Animate>
              }
            </div>
          </form>
          <div className="six columns">
            <button onClick={this.onRandom.bind(this)}>Generate Random Item</button>
          </div>
        </div>
        <div className="row">
          {
            <Animate change={this.props.change} durationChange={this.props.durationChange} style={{ marginBottom: 10 }}>
              <div>Total Items: {this.state.items.length}</div>
            </Animate>
          }
          <Animate component="ul" {...this.props} animateChangeIf={false}>
            {this.state.items.map(item => this.renderItem(item))}
          </Animate>
        </div>
      </div>
    );
  }

  renderItem(item) {
    return (
      <li key={item.id}>
        {item.name}
        <span style={{ cursor: 'pointer' }} onClick={() => this.removeItem(item.id)}>
          {' '}
          &times;
        </span>
      </li>
    );
  }
}

const randomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};
