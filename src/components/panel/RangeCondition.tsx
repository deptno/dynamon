import React, {Component} from 'react'
import {ConditionRow} from './ConditionRow'
import {connect} from 'react-redux'
import {actions} from '../../redux/dynamon'
import {RootState} from '../../redux'

export class RangeConditionComponent extends Component<Props> {
  render() {
    const {table} = this.props
    const hashKey = table
      ? table.KeySchema.find(k => k.KeyType === 'HASH')
      : null
    const rangeKey = table
      ? table.KeySchema.find(k => k.KeyType === 'RANGE') || null
      : null
    return <div>
      <ConditionRow id={this.props.id} pk={hashKey}/>
      {rangeKey && <ConditionRow id={this.props.id} pk={rangeKey}/>}
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
