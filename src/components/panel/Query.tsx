import React, {Component, Fragment} from 'react'
import {Filter} from './Filter'
import {RangeCondition} from './RangeCondition'
import {RadioOrder} from './RadioOrder'
import {aggregator} from './hoc-aggregator'

/**
 * @todo inject key <RangeCondition />
 */
export const Query = aggregator(
  class extends Component<Props> {
    render() {
      const {id} = this.props
      return <Fragment>
        <RangeCondition id={id}/>
        <hr/>
        <Filter id={id}/>
        <hr/>
        <RadioOrder/>
      </Fragment>
    }
  }
)

interface Props {
  id: number
}
