/* eslint-disable no-unused-vars */
import App from './App'

jest.mock('./components/VideoPlayer', () => 'VideoPlayer')

describe('<App />', () => {
  it('should render', () => {
    expect(document.body).toMatchSnapshot()
  })
})
