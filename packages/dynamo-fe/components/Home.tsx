import * as React from 'react'
import {connect} from 'react-redux'
import {StackableJsonTableComponent} from './StackableJsonTable'
import {Actions, actions, RootState} from '../redux'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import KeySchemaAttributeName = DocumentClient.KeySchemaAttributeName
import {SelectComponent} from './Select'

export class HomeComponent extends React.Component<Props, State> {
  render() {
    const {tables, table: {keys = [], items = []}} = this.props
    return (
      <div>
        <SelectComponent title="Endpoint" description="Select endpoint..." onChange={this.handleOnTableChange} disabled>
          {tables.map(table => (
            <option key={table.TableName} value={table.TableName}>
              {table.TableName}
            </option>
          ))}
        </SelectComponent>
        <SelectComponent title="Tables" description="Select table..." onChange={this.handleOnTableChange}>
          {tables.map(table => (
            <option key={table.TableName} value={table.TableName}>
              {table.TableName}
            </option>
          ))}
        </SelectComponent>
        <StackableJsonTableComponent
          keys={keys.map(key => key.AttributeName as KeySchemaAttributeName)}
          collection={items}
        />
      </div>
    )
  }

  componentDidMount() {
    this.props.getTables()
  }

  handleOnTableChange = ev => {
    this.props.selectTable(ev.target.value)
  }
}

const mapStateToProps = (state: RootState) => state
const mapDispatchToProps = actions
export const Home = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(HomeComponent)

interface StateProps extends RootState {}
interface DispatchProps extends Actions {}
interface OwnProps {}
interface Props extends StateProps, DispatchProps, OwnProps {}
interface State {}
