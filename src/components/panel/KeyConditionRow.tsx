import React, {Component} from 'react'
import {Checkbox} from '@blueprintjs/core'
import {ConditionColumn} from './ConditionColumn'
import {TOperatorType} from './OperatorColumn'
import {RootState} from '../../redux'
import {KeyConditionColumn} from './KeyConditionColumn'
import {KeyTypeColumn} from './KeyTypeColum'
import {KeyOperatorColumn} from './KeyOperatorColumn'

export class KeyConditionRow extends Component<Props, State> {
  readonly state = {
    enabled: true,
    type   : 'S' as TOperatorType,
  }

  render() {
    const {id, pk} = this.props
    const {enabled, type} = this.state

    return <div className="flex justify-around">
      <Checkbox onChange={this.handleEnabledChange} checked={enabled} disabled={!!pk}/>
      <KeyConditionColumn
          name={`property${id}`}
          placeholder="Property"
          className="w-20"
          disabled={!enabled || !!pk}
          data={pk}
        />
      <KeyTypeColumn
        name={`type${id}`}
        type={type}
        placeholder="Type"
        onChange={this.handleTypeChange}
        disabled={!enabled || !!pk}
        data={pk}
      />
      <KeyOperatorColumn
        name={`operator${id}`}
        type={type}
        placeholder="Operator"
        disabled={!enabled || !!pk && pk.KeyType === 'HASH'}
        data={pk}
      />
      <ConditionColumn disabled={!enabled} name={`value${id}`} placeholder="Value" className="w-60"/>
    </div>
  }

  handleEnabledChange = e => this.setState({enabled: !this.state.enabled})
  handleTypeChange = e => this.setState({type: e.target.value})
}

interface Props {
  id: number
  pk?: RootState['dynamon']['keys'][0]
}
interface State {
  enabled: boolean
  type: TOperatorType
}
