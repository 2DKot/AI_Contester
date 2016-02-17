/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
"use strict";
import * as React from 'react';

export interface IMainProps { }

export interface IMainState { }

export class Hello extends React.Component<IMainProps, IMainState> {
  render() {
    return (
      <div>
        HELLLOOO
      </div>
    );
  }
}

