import * as React from 'react'
import {StackableJsonTableComponent} from './StackableJsonTable'
import {Popover} from '@blueprintjs/core'
import {TableStateDescription} from './TableStateDescription'
import {JsonComponent} from './Json'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Actions, actions} from 'dynamon-redux-actions'

export class DynamoTableComponent extends React.Component<Props, State> {
  render() {
    const {table, records, onItemSelected, onRefresh} = this.props

    return (
      <div>
        <label className="pt-label pt-inline">
          Records
          {table && (
            <Popover>
              <button className="pt-button pt-icon-add pt-intent-primary pt-inline pt-minimal"/>
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
          <button
            onClick={onRefresh}
            className="pt-button pt-icon-refresh pt-intent-danger pt-inline pt-minimal"
            disabled={!records}
          />
        </label>
        {records
          ? records.length > 0
            ? <StackableJsonTableComponent collection={records} onItemSelected={onItemSelected}/>
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
}

const mapStateToProps = (state: RootState) => state
const mapDispatchToProps = actions
export const DynamoTable = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DynamoTableComponent)

interface StateProps extends RootState {
}
interface DispatchProps extends Actions {
}
interface OwnProps {
  onItemSelected?(json): void
  onRefresh?(): void
}
interface Props extends StateProps, DispatchProps, OwnProps {
}
interface State {
}
