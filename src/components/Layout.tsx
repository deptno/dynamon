import * as React from 'react'
import {Header} from './Header'
import {Footer} from './Footer'
import Head from 'next/head'
import 'normalize.css/normalize.css'
import css from './Layout.css'

export class Layout extends React.Component<{}, {}> {
  render() {
    const {children} = this.props
    return (
      <div id="layout" className={css.layout}>
        <Head/>
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
      </div>
    )
  }
}
