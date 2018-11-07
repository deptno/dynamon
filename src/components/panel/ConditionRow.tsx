import React, {Component} from 'react'
import classnames from 'classnames'
import {Checkbox} from '@blueprintjs/core'

export class ConditionRow extends Component<Props, State> {
  readonly state = {
    enabled: true
  }
  render() {
    const {required} = this.props
    const {enabled} = this.state

    return <div className="flex justify-around">
      <Checkbox checked={enabled} disabled={required} onChange={this.handleEnabledChange}/>
      <ConditionColumn disabled={!enabled} name="property" type="text" placeholder="Property"/>
      <ConditionColumn disabled={!enabled} name="type" type="text" placeholder="Type"/>
      <ConditionColumn disabled={!enabled} name="operator" type="text" placeholder="Operator"/>
      <ConditionColumn disabled={!enabled} name="value" type="text" placeholder="Value"/>
    </div>
  }
  handleEnabledChange = ev => this.setState({enabled: !this.state.enabled})
}

interface Props {
  required?: boolean
}

const ConditionColumn: React.SFC<ConditionColumn> = props =>
  <input
    name={props.name}
    className={classnames('bp3-input w-100 mh2', props.className)}
    type={props.type}
    placeholder={props.placeholder}
    disabled={props.disabled}
  />

interface ConditionColumn {
  name: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
}

interface State {
  enabled: boolean
}
