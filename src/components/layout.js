import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import './layout.css'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: scroll;
`

const Container = styled.div`
  max-width: 480px;
`

const Layout = ({ children }) => {
  return (
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
          <link href="https://fonts.googleapis.com/css?family=Fredoka+One" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Helmet>
        <Wrapper>
          <Container>
            {children}
          </Container>
        </Wrapper>
      </>
    )}
  />
)}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
