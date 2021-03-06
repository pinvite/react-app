import { navigate } from 'gatsby'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { AuthStatusContext, LoginStatus } from '../../context/AuthStatusContext'
import { DescriptionProps, H3Centered, H4Left } from '../Atoms/Description'
import PrimaryButton, { PrimaryButtonProps } from '../Atoms/PrimaryButton'
import TermsAndConditionsLink, {
  TermsAndConditionsLinkProps,
} from '../Atoms/TermsAndConditionsLink'

export interface CallToActionProp {
  description: React.ReactNode
  registerButtonText: string
  jumpToButtonText: string
  className?: string // allow styled-components to inject CSS margin from outside. Only margin, no other CSS property from outside.
}

const H3CenteredStyled = styled(H3Centered as React.SFC<DescriptionProps>)`
  && {
    margin-bottom: 80px;
  }
`

const H4LeftStyled = styled(H4Left as React.SFC<DescriptionProps>)`
  && {
    margin-bottom: 80px;
  }
`

export const CallToActionTop: React.SFC<CallToActionProp> = props => (
  // Important to accept the className prop, to inject CSS margin from outside.</Atom>
  // Only margin, no other CSS property from outside.
  <div className={props.className} data-cy="call-to-action">
    <H3CenteredStyled description={props.description} />
    <AuthStatusContext.Consumer>
      {({ handleLogin, loginStatus }) => {
        if (loginStatus === LoginStatus.LoggedIn) {
          return (
            <PrimaryButton
              text={props.jumpToButtonText}
              callback={() => {
                navigate('/entry/')
              }}
            />
          )
        } else {
          return (
            <React.Fragment>
              <PrimaryButton
                text={props.registerButtonText}
                callback={handleLogin}
              />
              <TermsAndConditionsLinkStyled />
            </React.Fragment>
          )
        }
      }}
    </AuthStatusContext.Consumer>
  </div>
)

const TermsAndConditionsLinkStyled = styled(TermsAndConditionsLink as React.SFC<
  TermsAndConditionsLinkProps
>)`
  && {
    display: flex;
    justify-content: center;
  }
`

export const CallToActionBottom: React.SFC<CallToActionProp> = props => (
  // Important to accept the className prop, to inject CSS margin from outside.</Atom>
  // Only margin, no other CSS property from outside.
  <div className={props.className} data-cy="call-to-action">
    <H4LeftStyled description={props.description} />
    <AuthStatusContext.Consumer>
      {({ handleLogin, loginStatus }) => {
        if (loginStatus === LoginStatus.LoggedIn) {
          return (
            <PrimaryButton
              text={props.jumpToButtonText}
              callback={() => {
                navigate('/entry/')
              }}
            />
          )
        } else {
          return (
            <React.Fragment>
              <PrimaryButton
                text={props.registerButtonText}
                callback={handleLogin}
              />
              <TermsAndConditionsLinkStyled />
            </React.Fragment>
          )
        }
      }}
    </AuthStatusContext.Consumer>
  </div>
)
