import loadjs from 'loadjs'
import { h, render } from 'preact'
import VideoPlayer from './components/VideoPlayer'

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      type: 'application/x-mpegURL'
    }
  ]
}

loadjs('//imasdk.googleapis.com/js/sdkloader/ima3.js', () => {
  render(<VideoPlayer options={videoJsOptions} />, document.body)
})
