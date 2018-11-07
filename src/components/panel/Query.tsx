import React, {Component} from 'react'
import {Filter} from './Filter'
import {RangeCondition} from './RangeCondition'
import {RadioOrder} from './RadioOrder'

export class Query extends Component {
  render() {
    return <div>
      <RangeCondition/>
      <hr/>
      <Filter/>
      <hr/>
      <RadioOrder/>
    </div>
  }
}
