import { h, render } from 'preact'
import VideoPlayer from './components/VideoPlayer'

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src:
        'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
      type: 'video/mp4'
    }
  ]
}

render(<VideoPlayer options={videoJsOptions} />, document.body)
