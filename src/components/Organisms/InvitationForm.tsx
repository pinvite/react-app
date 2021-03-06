import { navigate } from 'gatsby'
import React from 'react'
import { AuthStatusContext } from '../../context/AuthStatusContext'
import { cloudinaryImageUrl } from '../../utils/cloudinary'
import { isSendTweetError, sendTweet } from '../../utils/TweetClient'
import EntryBottom from '../Molecules/EntryBottom'
import ImageLoader from '../Molecules/ImageLoader'
import InviteInputs from '../Molecules/InviteInputs'
import PreviewBottom from '../Molecules/PreviewBottom'
import ModalWaiting from './ModalWaiting'

const spinnerImageURL =
  'https://res.cloudinary.com/pinvite/image/upload/v1546625349/spinner.gif'

export interface InvitationFormProps {
  inputTitleLabel: string
  inputTitleHelperText: string
  inputDetailsLabel: string
  inputMoneyAmountLabel: string
  inputTimeLabel: string
  previewButtonText: string
  goBackButtonText: string
  tweetButtonText: string
  className?: string // allow styled-components to inject CSS margin from outside.
  // Only margin, no other CSS property from outside
}

interface InvitationFormState {
  title: string
  details: string
  moneyAmount: string
  time: string
  preview: boolean
  previewImageSrc: string
  isModalOpen: boolean
}

class InvitationForm extends React.Component<
  InvitationFormProps,
  InvitationFormState
> {
  constructor(props: InvitationFormProps) {
    super(props)
    this.state = {
      title: '',
      details: '',
      moneyAmount: '',
      time: '',
      preview: false,
      previewImageSrc: spinnerImageURL,
      isModalOpen: false,
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDetailsChange = this.onDetailsChange.bind(this)
    this.onMoneyAmountChange = this.onMoneyAmountChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onPreviewButtonPressed = this.onPreviewButtonPressed.bind(this)
    this.onGoBackButtonPressed = this.onGoBackButtonPressed.bind(this)
    this.onTweetButtonPressed = this.onTweetButtonPressed.bind(this)
  }

  onTitleChange(title: string) {
    this.setState({ title })
  }

  onDetailsChange(details: string) {
    this.setState({ details })
  }

  onMoneyAmountChange(moneyAmount: string) {
    this.setState({ moneyAmount })
  }

  onTimeChange(time: string) {
    this.setState({ time })
  }

  onPreviewButtonPressed() {
    this.setState({ preview: true })
  }

  onGoBackButtonPressed() {
    this.setState({ preview: false })
  }

  onTweetButtonPressed(
    userId: string,
    idToken: string,
    title: string,
    details: string,
    time: string,
    moneyAmount: string,
    imageURL: string
  ) {
    this.setState({ isModalOpen: true })
    sendTweet(userId, idToken, title, details, time, moneyAmount, imageURL)
      .then(invitationResponse => {
        this.setState({ isModalOpen: false })
        navigate(
          `/users/${invitationResponse.userId}/invitations/${
            invitationResponse.invitationId
          }`
        )
      })
      .catch(error => {
        this.setState({ isModalOpen: false })
        if (isSendTweetError(error)) {
          alert(error.message)
        } else {
          alert('エラー: 予期しないエラーが発生しました。')
        }
      })
  }

  imageURL(): string {
    return cloudinaryImageUrl(
      this.state.title,
      this.state.time,
      this.state.moneyAmount
    )
  }

  isErrorTitle(): boolean {
    return this.state.title.length > 70
  }

  isErrorDetails(): boolean {
    return this.state.details.length > 1000
  }

  isErrorMoneyAmount(): boolean {
    return parseInt(this.state.moneyAmount, 10) < 0
  }

  isErrorTime(): boolean {
    return parseInt(this.state.time, 10) < 0
  }

  isDisabledInput(): boolean {
    function isEmpty(input: string): boolean {
      return input.length === 0
    }
    return (
      isEmpty(this.state.title) ||
      this.isErrorTitle() ||
      isEmpty(this.state.details) ||
      this.isErrorDetails() ||
      isEmpty(this.state.moneyAmount) ||
      this.isErrorMoneyAmount() ||
      isEmpty(this.state.time) ||
      this.isErrorTime()
    )
  }

  renderInputs() {
    return (
      <React.Fragment>
        <InviteInputs
          inputTitleProps={{
            label: this.props.inputTitleLabel,
            value: this.state.title,
            helperText: this.props.inputTitleHelperText,
            error: this.isErrorTitle(),
            onChange: this.onTitleChange,
          }}
          inputDetailsProps={{
            label: this.props.inputDetailsLabel,
            value: this.state.details,
            error: this.isErrorDetails(),
            onChange: this.onDetailsChange,
          }}
          inputMoneyAmountProps={{
            label: this.props.inputMoneyAmountLabel,
            value: this.state.moneyAmount,
            error: this.isErrorMoneyAmount(),
            onChange: this.onMoneyAmountChange,
          }}
          inputTimeProps={{
            label: this.props.inputTimeLabel,
            value: this.state.time,
            error: this.isErrorTime(),
            onChange: this.onTimeChange,
          }}
        />
        <EntryBottom
          previewButtonText={this.props.previewButtonText}
          previewButtonCallback={this.onPreviewButtonPressed}
          previewDisabled={this.isDisabledInput()}
        />
      </React.Fragment>
    )
  }

  renderPreview() {
    return (
      <AuthStatusContext.Consumer>
        {({ userInfo }) => (
          <React.Fragment>
            <ImageLoader
              previewImageURL={this.state.previewImageSrc}
              imageURL={cloudinaryImageUrl(
                this.state.title,
                this.state.time,
                this.state.moneyAmount
              )}
            />
            <PreviewBottom
              goBackButtonText={this.props.goBackButtonText}
              goBackButtonCallback={this.onGoBackButtonPressed}
              tweetButtonText={this.props.tweetButtonText}
              tweetButtonCallback={() => {
                if (userInfo != null) {
                  const imageURL = this.imageURL()
                  this.onTweetButtonPressed(
                    userInfo.userId,
                    userInfo.idToken,
                    this.state.title,
                    this.state.details,
                    this.state.time,
                    this.state.moneyAmount,
                    imageURL
                  )
                }
              }}
            />
            <ModalWaiting open={this.state.isModalOpen} />
          </React.Fragment>
        )}
      </AuthStatusContext.Consumer>
    )
  }

  render() {
    if (this.state.preview) {
      return <div className={this.props.className}>{this.renderPreview()}</div>
    } else {
      return <div className={this.props.className}>{this.renderInputs()}</div>
    }
  }
}

export default InvitationForm
