/// <reference path="../../typings/react/react.d.ts"/>
"use strict";

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Hello} from './test';

ReactDom.render(React.createElement(Hello), document.getElementById('app'));
