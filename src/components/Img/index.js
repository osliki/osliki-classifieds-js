//https://github.com/mbrevda/react-image

import React, {Component} from 'react'
import {node, string, number} from 'prop-types'

class Img extends Component {
  static propTypes = {
    loader: node,
    loaded: node,
    unloader: node,
    retryDelay: number,
    retryCount: number,
    src: string.isRequired
  }

  static defaultProps = {
    loader: null,
    loaded: null,
    unloader: null,
    retryDelay: 1,
    retryCount: 8
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isLoaded: false,
      retryCounter: props.retryCount
    }

  }

  onLoad = () => {
console.log('IMG onLoad')
    this.setState({isLoading: false, isLoaded: true})
  }

  onError = () => {
console.log('IMG onError')
    if (this.state.retryCounter > 0) {
      setTimeout(this.loadImg, this.props.retryDelay * 1000)

      this.setState(prevState => ({
        retryCounter: prevState.retryCounter - 1
      }))
    } else {
      this.setState({
        isLoading: false,
        isLoaded: false
      })
    }
  }

  loadImg = () => {
    this.i = new Image()
    this.i.src = this.props.src
    this.i.onload = this.onLoad
    this.i.onerror = this.onError
  }

  unloadImg = () => {
    if (this.i) {
      this.i.onerror = null
      this.i.onload = null
    }
  }

  componentWillMount() {
    this.loadImg()
  }

  componentWillUnmount() {
    this.unloadImg()
  }

  render() {
    const {isLoaded, isLoading, retryCounter} = this.state
    const {src, loader, loaded, unloader, retryCount, retryDelay, ...rest} = this.props

    // if we have loaded, show img
    if (isLoaded)
      return loaded ? loaded : <img src={src} {...rest} />

    // if we are still trying to load, show img and a Loader if requested
    if (!isLoaded && isLoading)
      return loader ? loader : 'Loading...'

    // if we have given up on loading, show a place holder if requested, or nothing
    if (!isLoaded && !isLoading && retryCounter <= 0)
      return unloader ? unloader : "Image can't be loaded"

    return null
  }
}

export default Img