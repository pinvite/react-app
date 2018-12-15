import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import InputAdornment, { InputAdornmentProps } from '@material-ui/core/InputAdornment'
import Atom from '../Atom'
import MuiTheme from '../../../theme/MuiTheme'
import {ClassNameProps} from './ClassNameProps'

const InputAdornmentStyled = styled(InputAdornment as React.SFC<InputAdornmentProps>)`
&& {
  margin-right: ${MuiTheme.spacing.unit},
}`

export const InputMoneyAmount: React.SFC<ClassNameProps> = (props) =>
  // Important to accept the className prop, to inject CSS margin from outside.
  // Only margin, no other CSS property from outside.
  <Atom className={props.className}>
    <TextField
      label="勉強会のギャラ"
      variant="outlined"
      margin="none"
      InputProps={{
        // style={{marginTop: 0}} is some hack to correct styling,
        // as the `position` attribute is required but that adds a weird `margin-top: 16px` styling
        startAdornment: <InputAdornmentStyled style={{marginTop: 0}} variant="filled" position="start">¥</InputAdornmentStyled>
      }}
    />
  </Atom>
