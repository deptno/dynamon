import * as React from 'react'
import {connect} from 'react-redux'
import {StackableJsonTableComponent} from './StackableJsonTable'
import {Actions, actions, RootState} from '../redux'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import KeySchemaAttributeName = DocumentClient.KeySchemaAttributeName
import {SelectComponent} from './Select'
import {JsonComponent} from './Json'

export class HomeComponent extends React.Component<Props, State> {
  private selectedTable = '__'
  state = {
    json: null,
  }

  render() {
    const {loadingEndpoints, endpoints, tables, table: {keys = [], items = []}} = this.props
    const countTables = tables.length
    return (
      <div>
        <div className="pt-control-group pt-fill">
          <SelectComponent
            title="Endpoint"
            description={loadingEndpoints ? 'Built-in DynamoDB initializing...' : `Select endpoint from ${endpoints.length} endpoints`}
            onChange={this.handleOnEndpointChange}
          >
            {endpoints.map(({name, endpoint}) => <option key={endpoint} value={endpoint}>{name}</option>)}
          </SelectComponent>
          <SelectComponent
            title="Table"
            description={countTables > 0 ? `Select table from ${countTables} tables` : 'none'}
            onChange={this.handleOnTableChange}
            disabled={countTables === 0}
          >
            {tables.map(({TableName}) => <option key={TableName} value={TableName}>{TableName}</option>)}
          </SelectComponent>
        </div>
        <JsonComponent src={this.state.json || items} onEdit={this.handleJsonEdit}/>
        <StackableJsonTableComponent
          keys={keys.map(key => key.AttributeName as KeySchemaAttributeName)}
          collection={items}
          onItemSelected={this.handleOnItemSelected}
          onRefresh={this.handleOnRefreshRecords}
        />
      </div>
    )
  }

  async componentDidMount() {
    this.props.readEndpoints()
  }

  handleJsonEdit = (prev, next) => {
    console.log('before edit', prev, 'after edit', next)
    this.props.updateRecord(this.selectedTable, next)
  }

  handleOnEndpointChange = ev => {
    const value = ev.target.value

    if (!value.startsWith('__')) {
      const endpoint = this.props.endpoints.find(({endpoint}) => endpoint === value)

      if (endpoint) {
        console.table(this.props.endpoints)
        console.log(endpoint, value)
        this.props.readTables(endpoint)
      }
    }
    //todo: add
    console.log(value)
  }

  handleOnTableChange = ev => {
    const value = ev.target.value

    if (!value.startsWith('__')) {
      this.props.readRecords(value)
      this.selectedTable = value
      return
    }
    this.selectedTable = '__'
    //todo: add
    console.log(value)
  }

  handleOnItemSelected = json => {
    this.setState({json})
  }

  handleOnRefreshRecords = () => {
    if (!this.selectedTable.startsWith('__')) {
      this.props.readRecords(this.selectedTable)
    } else {
      alert('before do this select correct table')
    }
  }
}

const mapStateToProps = (state: RootState) => state
const mapDispatchToProps = actions
export const Home = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(HomeComponent)

interface StateProps extends RootState {
}
interface DispatchProps extends Actions {
}
interface OwnProps {
}
interface Props extends StateProps, DispatchProps, OwnProps {
}
interface State {
  json: Object | Array<any>
}
