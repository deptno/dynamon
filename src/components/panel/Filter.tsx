import React from 'react'
import classnames from 'classnames'
import {ConditionRow} from './ConditionRow'

export const Filter: React.SFC<Props> = props => <div>
  <ConditionRow id={props.id}/>
  <ConditionRow id={props.id}/>
  <ConditionRow id={props.id}/>
  <ConditionRow id={props.id}/>
  <ConditionRow id={props.id}/>
</div>

interface Props {
  id: number
}
