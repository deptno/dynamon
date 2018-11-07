import React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Json} from './Json'
import {DynamoTable} from './DynamoTable'
import {actions} from '../redux/dynamon'
import {SelectTable} from './SelectTable'
import {SelectEndpoint} from './EndpointSelect'
import {Search} from './panel/Search'

export class HomeComponent extends React.Component<Props, State> {
  state = {
    json: null,
  }

  render() {
    return (
      <div>
        <div className="bp3-control-group bp3-fill">
          <SelectEndpoint/>
          <SelectTable/>
        </div>
        <Search />
        <Json title="Document" src={this.state.json} onEdit={this.handleJsonEdit}/>
        <DynamoTable onItemSelected={this.handleOnItemSelected} onRefresh={this.handleOnRefreshRecords}/>
      </div>
    )
  }

  handleJsonEdit = async (prev, next) => {
    console.log('before edit', prev, 'after edit', next)
    await this.props.updateRecord(this.props.selectedTable, next)
    this.props.readRecords(this.props.table.TableName)
    if (!next) {
      if (confirm('delete row?')) {
        // @todo delete row
        console.log('@todo delete row')
      }
    }
  }

  handleOnItemSelected = json => {
    this.setState({json})
  }

  handleOnRefreshRecords = () => {
    if (!this.props.selectedTable.startsWith('__')) {
      this.props.readRecords(this.props.selectedTable)
    }
  }
}

const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions

export const Home = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(HomeComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
type Props = StateProps & DispatchProps

interface State {
  json: Object | Array<any>
}
