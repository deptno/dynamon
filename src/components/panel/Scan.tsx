import React, {Component, createRef} from 'react'
import {Filter} from './Filter'
import * as R from 'ramda'
import {aggregator} from './hoc-aggregator'

export const Scan = aggregator(
  class Scan extends Component<Props> {
    render() {
      const {id} = this.props
      return <Filter id={id}/>
    }
  })

interface Props {
  id: number
}

