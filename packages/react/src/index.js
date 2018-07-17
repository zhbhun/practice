import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker';
import 'todomvc-app-css/index.css'

render(<App />, document.getElementById('root'));
registerServiceWorker();
