import React, {Component} from 'react'
import classnames from 'classnames'
import {Checkbox} from '@blueprintjs/core'
import {ConditionColumn} from './ConditionColumn'

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
interface State {
  enabled: boolean
}
