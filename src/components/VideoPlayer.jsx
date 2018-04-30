import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import videojs from 'video.js'

/* eslint-disable import/no-webpack-loader-syntax,import/no-unresolved */
import '!style-loader!css-loader!video.js/dist/video-js.css'

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
    console.log('ready', this.player)
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
          <video ref={this.handleRef} className="video-js" />
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
