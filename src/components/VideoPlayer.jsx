import { h, Component } from 'preact'
import videojs from 'video.js'

export default class VideoPlayer extends Component {
  constructor() {
    super()
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    })
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
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
        <p>hello world</p>
        <div data-vjs-player>
          hi
          <video ref={this.handleRef} className="video-js" track="test" />
        </div>
      </div>
    )
  }
}
