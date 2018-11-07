import React from 'react'
import {ConditionRow} from './ConditionRow'

export const RangeCondition: React.SFC<Props> = props => <div>
  <ConditionRow required/>
  {props.hasRangeKey && <ConditionRow required/>}
</div>

interface Props {
  hasRangeKey?: boolean
}
