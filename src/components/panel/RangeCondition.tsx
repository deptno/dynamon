import React, {Component} from 'react'
import {ConditionRow} from './ConditionRow'
import {connect} from 'react-redux'
import {actions} from '../../redux/dynamon'
import {RootState} from '../../redux'

export class RangeConditionComponent extends Component<Props> {
  render() {
    const {table} = this.props
    return <div>
      <ConditionRow id={this.props.id} required/>
      {this.props.hasRangeKey && <ConditionRow id={this.props.id} required rangeKey/>}
    </div>
  }
}

const mapStateToProps = (state: RootState) => state.dynamon
export const RangeCondition = connect(mapStateToProps, actions)(RangeConditionComponent)

type ConnectedProps = ReturnType<typeof mapStateToProps> & typeof actions
interface Props extends ConnectedProps {
  id: number
  hasRangeKey?: boolean
}
