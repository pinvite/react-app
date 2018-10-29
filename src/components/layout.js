import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import {AuthStatusProvider} from '../context/AuthStatusContext'
import {RequestProvider} from '../context/RequestContext'
import './layout.css'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  max-width: 480px;
  width: 90%;
  max-height: 640px;
  height: 96%;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Wrapper>
          <Container>
            <AuthStatusProvider>
              <RequestProvider>
                {children}
              </RequestProvider>
            </AuthStatusProvider>
          </Container>
        </Wrapper>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
