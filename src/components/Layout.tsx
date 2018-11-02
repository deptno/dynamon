import * as React from 'react'
import {Header} from './Header'
import {Footer} from './Footer'
import Head from 'next/head'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

export const Layout = props => (
  <div id="layout" className={'bp3-dark'} style={{backgroundColor: 'rgb(55,72,87)'}}>
    <Head/>
    <Header/>
    <main>
      {props.children}
    </main>
    <Footer/>
  </div>
)
