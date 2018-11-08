import React, {Component} from 'react'
import {Checkbox} from '@blueprintjs/core'
import {ConditionColumn} from './ConditionColumn'
import {TypeColumn} from './TypeColumn'
import {OperatorColumn, TOperatorType} from './OperatorColumn'

export class ConditionRow extends Component<Props, State> {
  readonly state = {
    enabled: true,
    type   : 'S' as TOperatorType,
  }

  render() {
    const {id} = this.props
    const {enabled, type} = this.state

    return <div className="flex justify-around">
      <Checkbox onChange={this.handleEnabledChange} checked={enabled}/>
      <ConditionColumn name={`property${id}`} placeholder="Property" className="w-20" disabled={!enabled}/>
      <TypeColumn
        name={`type${id}`}
        type={type}
        placeholder="Type"
        onChange={this.handleTypeChange}
        disabled={!enabled}
      />
      <OperatorColumn name={`operator${id}`} type={type} placeholder="Operator" disabled={!enabled}/>
      <ConditionColumn disabled={!enabled} name={`value${id}`} placeholder="Value" className="w-60"/>
    </div>
  }

  handleEnabledChange = e => this.setState({enabled: !this.state.enabled})
  handleTypeChange = e => this.setState({type: e.target.value})
}

interface Props {
  id: number
}
interface State {
  enabled: boolean
  type: TOperatorType
}
