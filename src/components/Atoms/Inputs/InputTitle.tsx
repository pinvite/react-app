import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import InputAdornment, { InputAdornmentProps } from '@material-ui/core/InputAdornment'
import Atom from '../Atom'
import {InputFieldProps} from './InputFieldProps'



export const InputTitle: React.SFC<InputFieldProps> = (props) =>
  // Important to accept the className prop, to inject CSS margin from outside.
  // Only margin, no other CSS property from outside.
  <Atom className={props.className}>
    <TextField
      label={props.label}
      helperText={props.helperText}
      fullWidth
      margin="none"
      multiline
      rows={3}
      variant="outlined"
    />
  </Atom>
