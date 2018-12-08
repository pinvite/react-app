import React from 'react'
import Typography, { TypographyProps }  from '@material-ui/core/Typography'
import Paper from  '@material-ui/core/Paper'
import styled from 'styled-components'
import PrimaryButton, { PrimaryButtonProps } from  '../Atoms/PrimaryButton'

export interface CallToActionProp {
  description: React.ReactNode,
  buttonText: string
}

const TypographyStyled = styled(Typography as React.SFC<TypographyProps>)`
&& {
  margin-bottom: 80px;
}`

const PrimaryButtonStyled = styled(PrimaryButton as React.SFC<PrimaryButtonProps>)`
&& {
  margin-bottom: 40px;
}`

export const CallToActionTop: React.SFC<CallToActionProp> = (props) =>
  <Paper elevation={0}>
    <TypographyStyled variant='h3' align='center'>{props.description}</TypographyStyled>
    <PrimaryButtonStyled text={props.buttonText} />
  </Paper>

export const CallToActionBottom: React.SFC<CallToActionProp> = (props) =>
  <Paper elevation={0}>
    <TypographyStyled variant='h4'>{props.description}</TypographyStyled>
    <PrimaryButtonStyled text={props.buttonText} />
  </Paper>
