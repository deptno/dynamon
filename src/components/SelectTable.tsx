import React from 'react'
import {TableDescription} from './TableDescription'
import {PopoverButton} from './PopoverButton'
import {TableCreator} from './TableCreator'
import {Select} from './Select'
import {actions} from '../redux/dynamon'
import {RootState} from '../redux'
import {connect} from 'react-redux'

declare module 'react' {
  export function createRef<T extends HTMLElement = HTMLElement>(): T
}

class SelectTableComponent extends React.Component<Props> {
  render() {
    const {props, handleOnTableChange, handleOnCreate, handleOnDelete} = this
    const {tables, selectedTable, endpoint} = props

    return <div className="ph2">
      <Select
        title="Table"
        onChange={handleOnTableChange}
        description={tables.length > 0
          ? `Select table from ${tables.length} tables`
          : 'No table'
        }
      >
        {tables.map(({TableName}) => <option key={TableName} value={TableName}>{TableName}</option>)}
      </Select>
      <div className="bp3-button-group bp3-align-right bp3-minimal">
        <button
          type="button"
          className={`bp3-button bp3-icon-refresh bp3-intent-primary bp3-inline`}
          onClick={this.handleOnRefresh}
        />
        <PopoverButton
          content={<TableDescription name={selectedTable}/>}
          icon="zoom-in"
          color="primary"
          disabled={!this.hasSelectedTable()}
        />
        <PopoverButton
          content={<TableCreator handleOnCreate={handleOnCreate}/>}
          icon="add"
          color="success"
          disabled={!endpoint}
        />
        <button
          type="button"
          className={`bp3-button bp3-icon-remove bp3-intent-danger bp3-inline`}
          disabled={!this.hasSelectedTable()}
          onClick={handleOnDelete}
        />
      </div>
    </div>
  }

  private hasSelectedTable() {
    return this.props.selectedTable !== '__'
  }

  handleOnRefresh = ev => {
    this.props.readTables(this.props.endpoint)
  }
  handleOnCreate = ev => {
  }
  handleOnDelete = ev => {
    if (this.hasSelectedTable()) {
      const {records, selectedTable} = this.props

      // if (records.length !== 0) {
      //   return alert('Record MUST not be exist.')
      // }
      if (confirm('Do you want to delete table?')) {
        return this.props.deleteTable({TableName: selectedTable})
      }
    }
  }
  handleOnTableChange = async ev => {
    const value = ev.target.value

    this.props.setTable(value)
    if (!value.startsWith('__')) {
      await this.props.readRecords(value)
      return
    }
    //todo: add
  }
}
const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions

export const SelectTable = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SelectTableComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
type Props = StateProps & DispatchProps
