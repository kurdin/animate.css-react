# React animations with animate.css

<img src="https://cloud.githubusercontent.com/assets/6027060/25237321/4f1a39fa-25b8-11e7-8269-1743f8b8552e.gif"/>

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save animate.css-react
    $ npm install --save animate.css

## Run Demo

    $ git clone https://github.com/kurdin/animate.css-react
    $ cd animate.css-react
    $ npm install
    $ npm run demo

Open browser in http://localhost:8080

## Notes

You need to install and require animate.css yourself.

## Usage

```js
import Animate from 'animate.css-react'

import 'animate.css/animate.css'  // you need to require the css somewhere

// animate list, dont forget to add unique key to each item, don't use array index!!!
<Animate
    enter="bounceIn" // on Enter animation
    leave="bounceOut" // on Leave animation
    appear="fadeInRight" // on element Appear animation (onMount)
    change="flipInX" // on element Change animation (onUpdate)
    durationAppear={1000}
    durationEnter={1000}
    durationLeave={1000}
    durationChange={1000}
    animate={true|false|expression} // turn off/on animation, true by default
    animateChangeIf={true|false|expression} // turn off/on Change only animation, true by default
    component="ul">

    {this.state.items.map(item => <li key={item.id}>{item.name}</li>)}

</Animate>
// or animate single element / component

<Animate
    appear="fadeInDown"
    durationAppear={1000}
    component="div" >

  <h1>react animate.css</h1>

</Animate>
```

based on https://github.com/thiagoc7/react-animate.css
