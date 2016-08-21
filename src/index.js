import React from 'react';
import ReactDOM from 'react-dom';

import Example from './components/example';

ReactDOM.render(
    <Example url="/api/example"/>,
    document.getElementById('app')
);

