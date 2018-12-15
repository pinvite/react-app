import React, {Fragment} from 'react'
import styled from 'styled-components'

import {CallToActionBottom, CallToActionTop} from '../../components/Molecules/CallToAction'
import ConcernList from '../../components/Molecules/ConcernList'
import InvitationSample from '../Molecules/InvitationSample'
import { ConcerListProps } from '../Molecules/ConcernList';

export interface LandingContentsProps {
  firstCallToActionText: React.ReactNode,
  secondCallToActionText: string,
  buttonText: string,
  sampleCaptionText: string,
  concernCaptionText: string,
  concernText1: string,
  concernText2: string,
  concernText3: string,
  className?: string // allow styled-components to inject CSS margin from outside.
                     // Only margin, no other CSS property from outside
}

const CallToActionTopStyled　= styled(CallToActionTop)`
&& {
  margin-bottom: 80px;
}
`

const CallToActionBottomStyled = styled(CallToActionBottom)`
&& {
  margin-bottom: 80px;
}
`

const InvitationSampleStyled = styled(InvitationSample)`
&& {
  margin-bottom: 80px;
}
`

const ConcernListStyled = styled(ConcernList)`
&& {
  margin-bottom: 80px;
}
`

const LandingContents: React.SFC<LandingContentsProps> = (props) =>
  <div className={props.className}>
    <CallToActionTopStyled
      description={props.firstCallToActionText}
      buttonText={props.buttonText}
    />
    <InvitationSampleStyled
      captionText={props.sampleCaptionText}
    />
    <ConcernListStyled
      captionText={props.concernCaptionText}
      concernText1={props.concernText1}
      concernText2={props.concernText2}
      concernText3={props.concernText3}
    />
    <CallToActionBottomStyled
      description={props.secondCallToActionText}
      buttonText={props.buttonText}
    />
  </div>

export default LandingContents
