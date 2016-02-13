/// <reference path="../typings/react/react.d.ts"/>
/// <reference path="../typings/react/react-dom.d.ts"/>
"use strict";
import * as React from 'react';
import * as ReactDom from 'react-dom';

interface IMainProps { }

interface IMainState { }

class Main extends React.Component<IMainProps, IMainState> {
  render() {
    return (
      <div>
        HELLO WORLD
      </div>
    );
  }
}

ReactDom.render(React.createElement(Main, {}), document.getElementById('app'));