import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'

jest.mock('video.js')

videojs.dispose = jest.fn()

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
    context.component().player = { dispose: disposeSpy }
    context.component().componentWillUnmount()
    expect(disposeSpy).toHaveBeenCalled()
  })
})
