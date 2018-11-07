import React from 'react'
import classnames from 'classnames'

export const ConditionRow: React.SFC<{}> = props => <div className="flex justify-around">
  <ConditionColumn name="property" type="text" placeholder="Property"/>
  <ConditionColumn name="type" type="text" placeholder="Type"/>
  <ConditionColumn name="operator" type="text" placeholder="Operator"/>
  <ConditionColumn name="value" type="text" placeholder="Value"/>
</div>

const ConditionColumn: React.SFC<ConditionColumn> = props =>
  <input
    name={props.name}
    className={classnames('bp3-input w-100 mh2', props.className)}
    type={props.type}
    placeholder={props.placeholder}
  />

interface ConditionColumn {
  name: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
}
