import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { createChart } from './superbowlChart.js';
import {addTitle} from './addTitle.js';

document.querySelector('#app').innerHTML = `
  <div>
    <div id="title">
    <div id="mainTitle">
    Patrick Mahomes and The Kansas City Chiefs Dug Themselves a Historic Unsurmountable Half Time Deficit.
    </div>
    <div id="subTitle">
     The half time score is very predictive of who will win the game. Before Super Bowl 51 with Tom Bardy's New England Patriots no team had ever overcome a 7 point half time deficit.
    </div>
    </div>
    <div id="chart"></div>
  </div>
`
addTitle(document.querySelector('#mainTitle'), document.querySelector('#subTitle'))
createChart(document.querySelector('#chart'))

