import React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Json} from './Json'

export class TableDescriptionComponent extends React.Component<Props, State> {
  render() {
    return <Json title="Table description" src={this.props.table}/>
  }
}

const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = {}
export const TableDescription = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(TableDescriptionComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
interface OwnProps {
}
interface Props extends StateProps, DispatchProps, OwnProps {
  name: string
}
interface State {
}