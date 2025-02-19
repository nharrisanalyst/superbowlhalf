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
    <div id="authorTitle">
      By: <a id="me" href="https://bsky.app/profile/truesync.bsky.social">Nathan Harris</a>     <a href="https://bsky.app/profile/truesync.bsky.social">@truesync.bsky.social</a> <a href="http://nathanharris.co">nathanharris.co</a> 
    </div>

    </div>
    <div id="chart"></div> 
    <div id="links">
    <a href ="https://bsky.app/intent/compose?text=Patrick%20Mahomes%20and%20the%20KC%20Chiefs%20dug%20themselves%20a%20Historic%20half%20time%20deficit%20the%202nd%20worse%20ever.%20Explore%20Super%20Bowl%20comebacks%20and%20more%20in%20this%20Visualization%20http%3A%2F%2F https://nharrisanalyst.github.io/superbowlhalf/" class='sm-link'>
      <svg class="w-6 h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 568 501"><title>Bluesky butterfly logo</title><path fill="currentColor" d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z"></path></svg>
    </a>
    <div id="tweet-this">
    <a href="https://twitter.com/intent/tweet?hashtags=NFL&text=Explore Super Bowl Halftime Deficits&url=https://nharrisanalyst.github.io/superbowlhalf/" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
    <div id="reddit-this">
      <a href="https://reddit.com/submit?url=https%3A%2F%2Fnharrisanalyst.github.io%2Fsuperbowlhalf%2F&title=Patrick Mahomes and The Kansas City Chiefs Dug Themselves a Historic Unsurmountable Half Time Deficit." onclick="window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;" title="Share on Reddit" rel="noopener" >Share on Reddit</a>
    </div>
    <div id="newsletter">
       <div id="newsletter-title"> subscribe to my Data Visualization newsletter &nbsp; &nbsp; </div>
      <iframe src="https://embeds.beehiiv.com/da2f7bb3-4c1d-43cd-bb63-8094b70fa63f?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>
      </div>
    </div>
  </div>
`
addTitle(document.querySelector('#mainTitle'), document.querySelector('#subTitle'))
createChart(document.querySelector('#chart'))

