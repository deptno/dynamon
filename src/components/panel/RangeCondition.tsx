import React from 'react'
import {ConditionRow} from './ConditionRow'

export const RangeCondition: React.SFC<Props> = props => <div>
  <ConditionRow id={props.id} required/>
  {props.hasRangeKey && <ConditionRow id={props.id} required rangeKey/>}
</div>

interface Props {
  id: number
  hasRangeKey?: boolean
}
