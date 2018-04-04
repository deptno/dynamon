import * as React from 'react'
import {connect} from 'react-redux'
import {StackableJsonTableComponent} from './StackableJsonTable'
import {Actions, actions, RootState} from '../redux'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import KeySchemaAttributeName = DocumentClient.KeySchemaAttributeName
import {SelectComponent} from './Select'
import {JsonComponent} from './Json'
import classnames from 'classnames'

export class HomeComponent extends React.Component<Props, State> {
  private selectedTable = ''
  state = {
    json  : null,
    expend: false,
  }

  render() {
    const {endpoints, tables, table: {keys = [], items = []}} = this.props
    const {expend} = this.state
    return (
      <div>
        <div className="pt-control-group pt-fill">
          <SelectComponent
            title="Endpoint"
            description="Select endpoint..."
            onChange={this.handleOnEndpointChange}
          >
            {endpoints.map(({name, endpoint}) => <option key={endpoint} value={endpoint}>{name}</option>)}
          </SelectComponent>
          <SelectComponent title="Tables" description="Select table..." onChange={this.handleOnTableChange}>
            {tables.map(({TableName}) => <option key={TableName} value={TableName}>{TableName}</option>)}
          </SelectComponent>
        </div>
        <div style={expend ? {} : {maxHeight: '300px', overflow: 'scroll'}}>
          <label className="pt-label pt-inline" style={{marginTop: '10px', marginBottom: 0}}>
            JSON
            <button type="button" className={classnames('pt-button pt-minimal', {
              'pt-intent-success': !expend,
              'pt-intent-danger' : expend,
              'pt-icon-maximize' : !expend,
              'pt-icon-minimize' : expend,
            })} onClick={() => this.setState({expend: !expend})}/>
          </label>
          <JsonComponent src={this.state.json || items}/>
        </div>
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
    }
    this.selectedTable = value
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
  expend: boolean
}
