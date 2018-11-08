import React, {Component} from 'react'
import {connect} from 'react-redux'
import {actions} from '../../redux/dynamon'
import {RootState} from '../../redux'
import {KeyConditionRow} from './KeyConditionRow'

export class RangeConditionComponent extends Component<Props> {
  render() {
    const {table, keys} = this.props

    if (!table) {
      return null
    }

    const hashKey = keys.find(k => k.KeyType === 'HASH')
    const rangeKey = keys.find(k => k.KeyType === 'RANGE') || null

    return <div>
      <KeyConditionRow id={this.props.id} pk={hashKey}/>
      {rangeKey && <KeyConditionRow id={this.props.id} pk={rangeKey}/>}
    </div>
  }
}

const mapStateToProps = (state: RootState) => state.dynamon
export const RangeCondition = connect(mapStateToProps, actions)(RangeConditionComponent)

type ConnectedProps = ReturnType<typeof mapStateToProps> & typeof actions
interface Props extends ConnectedProps {
  id: number
  hasRangeKey?: boolean // @todo unused?
}
