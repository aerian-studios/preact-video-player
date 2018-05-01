import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'

jest.mock('video.js', () =>
  jest.fn((id, options, cb) => {
    setTimeout(cb)
    return { ima: jest.fn(), dispose: jest.fn() }
  })
)
jest.mock('videojs-contrib-ads', () => null)
jest.mock('videojs-contrib-hls', () => null)
jest.mock('videojs-ima', () => null)

describe('<VideoPlayer />', () => {
  it('should render', () => {
    const context = shallow(<VideoPlayer />)
    expect(context.toString()).toMatchSnapshot()
  })

  it('should initialize video.js on mount', () => {
    shallow(<VideoPlayer />)
    expect(videojs).toBeCalled()
  })

  it('should dispose video.js instance on unmount', () => {
    const context = shallow(<VideoPlayer />)
    const disposeSpy = jest.fn()
    const imaSpy = jest.fn()

    context.component().player = {
      dispose: disposeSpy,
      ima: imaSpy
    }

    context.component().componentWillUnmount()
    expect(disposeSpy).toHaveBeenCalled()
  })
})
