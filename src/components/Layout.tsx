import React from 'react'
import {Header} from './Header'
import {Footer} from './Footer'
import Head from 'next/head'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'tachyons/css/tachyons.min.css'

export const Layout = props => (
  <div id="layout" className={'bp3-dark pa2'} style={{backgroundColor: 'rgb(55,72,87)', height: '100%', minHeight: '100vh'}}>
    <Head/>
    <Header/>
    <main>
      {props.children}
    </main>
    {/*<Footer/>*/}
  </div>
)
