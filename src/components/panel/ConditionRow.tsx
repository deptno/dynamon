import React, {Component} from 'react'
import classnames from 'classnames'
import {Checkbox} from '@blueprintjs/core'
import {ConditionColumn} from './ConditionColumn'
import {TypeColumn} from './TypeColumn'
import {OperatorColumn, TOperatorType} from './OperatorColumn'

export class ConditionRow extends Component<Props, State> {
  readonly state = {
    enabled: true,
    type: 'S' as TOperatorType
  }
  render() {
    const {id, required} = this.props
    const {enabled, type} = this.state

    return <div className="flex justify-around">
      <Checkbox checked={enabled} disabled={required} onChange={this.handleEnabledChange}/>
      <ConditionColumn disabled={!enabled} name={'property' + id} type="text" placeholder="Property" className="w-20"/>
      <TypeColumn disabled={!enabled} name={'type' + id} type="text" placeholder="Type" onChange={this.handleTypeChange}/>
      <OperatorColumn disabled={!enabled} name={'operator' + id} type={type} placeholder="Operator"/>
      <ConditionColumn disabled={!enabled} name={'value' + id} type="text" placeholder="Value" className="w-60"/>
    </div>
  }
  handleEnabledChange = e => this.setState({enabled: !this.state.enabled})
  handleTypeChange = e => this.setState({type: e.target.value})
}

interface Props {
  id: number
  required?: boolean
  rangeKey?: boolean
}
interface State {
  enabled: boolean
  type: TOperatorType
}
