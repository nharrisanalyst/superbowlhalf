import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { createChart } from './superbowlChart.js'

document.querySelector('#app').innerHTML = `
  <div>
   
    <div id="chart"></div>
  </div>
`

createChart(document.querySelector('#chart'))
