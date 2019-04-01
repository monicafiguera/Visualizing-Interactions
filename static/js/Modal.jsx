// https://www.npmjs.com/package/simple-react-modal

import React from 'react'

export default class Modal extends React.Component {

  constructor(props) {
    super()
    this.hideOnOuterClick = this.hideOnOuterClick.bind(this)
    this.fadeIn = this.fadeIn.bind(this)
    this.fadeOut = this.fadeOut.bind(this)

    let opacity = 0,
      display = 'block',
      visibility = 'hidden'

    if(props.show) {
      opacity = 1
      display = 'block'
      visibility = 'visible'
    }

    this.state = {
      opacity,
      display,
      visibility,
      show: props.show
    }

  }

  hideOnOuterClick(event) {
    if (this.props.closeOnOuterClick === false) return
    if (event.target.dataset.modal && this.props.onClose instanceof Function) this.props.onClose(event)
  }

  componentWillReceiveProps(props) {
    if (this.props.show != props.show) {
      if (this.props.transitionSpeed) {
        if (props.show == true) this.fadeIn()
        else this.fadeOut()
      }
      else this.setState({show: props.show})
    }
  }

  fadeIn() {
    this.setState({
      display: 'block',
      visibility: 'visible',
      show: true
    }, ()=>{
      setTimeout(()=>{
        this.setState({opacity: 1})
      },10)
    })
  }

  fadeOut() {
    this.setState({opacity: 0}, ()=>{
      setTimeout(()=>{
        this.setState({show: false})
      }, this.props.transitionSpeed)
    })
  }

  render() {
    if(!this.state.show) return null
    let containerStyle

    containerStyle = Object.assign({}, this.props.containerStyle)

    return (
      <div {..._filteredProps(this.props)} className="modal" onClick={this.hideOnOuterClick} data-modal="true">
        <div className={this.props.containerClassName} style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function _filteredProps(props) {
  const filtered = Object.assign({}, props);
  [
    'containerStyle',
    'containerClassName',
    'closeOnOuterClick',
    'show',
    'onClose'
  ].map( p => {
    delete filtered[p]
  })
  return filtered
}