import React, {Fragment} from 'react'
import FullWidthImage from '../Atoms/FullWidthImage'

export interface ImageLoaderProps {
  previewImageURL: string,
  imageURL: string,
  className?: string
}

export interface LoadingState {
  isLoadCompleted: boolean
}

// Exceptional case where a Molecule has a state, becase this state is pretty self-contained and simple.
// Usually state should exist in Organisms or Template, not Atoms or Organisms to keep granular components simple.
class ImageLoader extends React.Component<ImageLoaderProps, LoadingState> {
  constructor(props: ImageLoaderProps) {
    super(props)
    this.state = {isLoadCompleted: false}
    this.onLoad = this.onLoad.bind(this)
  }

  onLoad(){
    this.setState({isLoadCompleted: true})
  }

  renderImageOrSpinner() {
    if(this.state.isLoadCompleted)
      return(
        <FullWidthImage className={this.props.className} src={this.props.imageURL} />
      )
    else 
      return(
        <FullWidthImage className={this.props.className} src={this.props.previewImageURL} />
      )
  }

  render() {
    return (
      <Fragment>
        <img hidden src={this.props.imageURL} onLoad={this.onLoad} />
        {this.renderImageOrSpinner()}
      </Fragment>
    )
  }
}

export default ImageLoader