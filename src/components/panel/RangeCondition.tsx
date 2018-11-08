import React from 'react'
import {ConditionRow} from './ConditionRow'
import {connect} from 'react-redux'
import {actions} from '../../redux/dynamon'
import {RootState} from '../../redux'

export const RangeConditionComponent: React.SFC<Props> = props => <div>
  <ConditionRow id={props.id} required/>
  {props.hasRangeKey && <ConditionRow id={props.id} required rangeKey/>}
</div>

const mapStateToProps = (state: RootState) => state.dynamon
export const RangeCondition = connect(mapStateToProps, actions)(RangeConditionComponent)

type ConnectedProps = ReturnType<typeof mapStateToProps> & typeof actions
interface Props extends ConnectedProps {
  id: number
  hasRangeKey?: boolean
}
