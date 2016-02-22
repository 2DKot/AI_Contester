/// <reference path="../../typings/react/react.d.ts"/>
"use strict";

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Hello, Num} from './test';

ReactDom.render(<div><Hello/><Num/></div>, document.getElementById('app'));
