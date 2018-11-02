import * as React from 'react'
import {StackableJsonTableComponent} from './StackableJsonTable'
import {Popover} from '@blueprintjs/core'
import {TableStateDescription} from './TableStateDescription'
import {JsonComponent} from './Json'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Actions, actions} from '../redux/dynamon'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('./Editor'), {ssr: false})

export class DynamoTableComponent extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, _) {
    if (nextProps.table) {
      return {
        keys: nextProps.table.KeySchema
          .sort((p, c) => p.KeyType === 'HASH_KEY' ? 1 : 0)
          .map(key => key.AttributeName),
      }
    }
    return null
  }

  readonly state = {
    keys: [],
  }

  render() {
    const {table, records, onItemSelected, onRefresh} = this.props

    return (
      <div>
        <label className="bp3-label bp3-inline">
          Records
          {table && (
            <Popover>
              <button className="bp3-button bp3-icon-add bp3-intent-primary bp3-inline bp3-minimal"/>
              <JsonComponent
                title="Add record"
                src={table.KeySchema.reduce((p, c) => {
                  p[c.AttributeName] = `input valid(type: string) ${c.AttributeName}`
                  return p
                }, {})}
                onEdit={this.handleOnEdit}
              />
            </Popover>
          )}
          {table && (
            <Popover>
              <button className="bp3-button bp3-icon-add-to-artifact bp3-intent-primary bp3-inline bp3-minimal"/>
              <Editor schema={table.KeySchema} onSave={this.writeRows}/>
            </Popover>
          )}
          <button
            onClick={onRefresh}
            className="bp3-button bp3-icon-refresh bp3-intent-danger bp3-inline bp3-minimal"
            disabled={!records}
          />
        </label>
        {records
          ? records.length > 0
            ? (
              <StackableJsonTableComponent
                keyOrder={this.state.keys}
                collection={records}
                onItemSelect={onItemSelected}
                onItemDelete={this.handleOnItemDelete}
              />
            )
            : <TableStateDescription description="Empty"/>
          : <TableStateDescription description="Select Table"/>
        }
      </div>
    )
  }

  handleOnEdit = async (prev, next) => {
    await this.props.createRecord(this.props.table.TableName, next)
    this.props.readRecords(this.props.table.TableName)
  }
  handleOnItemDelete = async item => {
    await this.props.deleteRecord(item)
    this.props.readRecords(this.props.table.TableName)
  }
  writeRows = async data => {
    const records = Array.isArray(data) ? data : [data]
    await this.props.createRecords(this.props.table.TableName, records)
    this.props.readRecords(this.props.table.TableName)
  }
}

const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions
export const DynamoTable = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DynamoTableComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
interface OwnProps {
  onItemSelected?(json): void
  onRefresh?(): void
}
type Props = StateProps & DispatchProps & OwnProps
interface State {
}
