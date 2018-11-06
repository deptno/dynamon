import React from 'react'
import {Home} from '../src/components/Home'
import {Layout} from '../src/components/Layout'

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <Home/>
      </Layout>
    )
  }
}