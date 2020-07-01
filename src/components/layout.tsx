/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Header from "./header"
import "./layout.css"

export interface LayoutProps {
  children: Array<JSX.Element>,
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <Header/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 600,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
