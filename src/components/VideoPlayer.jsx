import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import videojs from 'video.js'
import 'videojs-contrib-ads'
import 'videojs-contrib-hls'
import 'videojs-ima'

/* eslint-disable import/no-webpack-loader-syntax,import/no-unresolved */
import '!style-loader!css-loader!video.js/dist/video-js.css'
import '!style-loader!css-loader!videojs-ima/dist/videojs.ima.css'
import '!style-loader!css-loader!videojs-contrib-ads/dist/videojs-contrib-ads.css'

export default class VideoPlayer extends Component {
  constructor(...props) {
    super(...props)
    this.handleReady = this.handleReady.bind(this)
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props.options, this.handleReady)
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  handleReady() {
    this.player.ima({
      id: 'test-player',
      adTagUrl:
        'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator='
    })
  }

  handleRef(node) {
    this.videoNode = node
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  /* eslint-disable jsx-a11y/media-has-caption */
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            className="video-js"
            height="480"
            id="test-player"
            ref={this.handleRef}
            width="640"
          />
        </div>
      </div>
    )
  }
}

VideoPlayer.propTypes = {
  options: PropTypes.shape({
    autoplay: PropTypes.bool,
    controls: PropTypes.bool,
    sources: PropTypes.array({
      src: PropTypes.string,
      type: PropTypes.string
    })
  }).isRequired
}
