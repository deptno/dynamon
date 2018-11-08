import React, {Component} from 'react'
import classnames from 'classnames'
import {Checkbox} from '@blueprintjs/core'
import {ConditionColumn} from './ConditionColumn'
import {TypeColumn} from './TypeColumn'
import {OperatorColumn, TOperatorType} from './OperatorColumn'
import {RootState} from '../../redux'

export class ConditionRow extends Component<Props, State> {
  readonly state = {
    enabled: true,
    type: 'S' as TOperatorType
  }
  render() {
    const {id, pk} = this.props
    const {enabled, type} = this.state

    return <div className="flex justify-around">
      <Checkbox onChange={this.handleEnabledChange} checked={enabled} disabled={!!pk}/>
      <ConditionColumn name={'property' + id} type="text" placeholder="Property" className="w-20" disabled={!enabled || !!pk}/>
      <TypeColumn name={'type' + id} type="text" placeholder="Type" onChange={this.handleTypeChange} disabled={!enabled || !!pk}/>
      <OperatorColumn name={'operator' + id} type={type} placeholder="Operator" disabled={!enabled || !!pk && pk.KeyType === 'HASH'}/>
      <ConditionColumn disabled={!enabled} name={'value' + id} type="text" placeholder="Value" className="w-60"/>
    </div>
  }
  handleEnabledChange = e => this.setState({enabled: !this.state.enabled})
  handleTypeChange = e => this.setState({type: e.target.value})
}

interface Props {
  id: number
  pk?: RootState['dynamon']['table']['KeySchema'][0]
}
interface State {
  enabled: boolean
  type: TOperatorType
}
