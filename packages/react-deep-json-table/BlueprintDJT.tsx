import * as React from 'react'
import {DeepJsonTableComponent} from './DeepJsonTable'
import {RowModel} from './Row'
import {Cell, Column, ColumnHeaderCell, Table} from '@blueprintjs/table'
import {Button, ButtonGroup, Menu, MenuItem} from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'

export class BlueprintDJTComponent extends DeepJsonTableComponent<State> {
  state = {
    step      : [],
    headers   : [],
    collection: [],
    disabled  : {
      cell      : false,
      collection: false,
    },
  }

  render() {
    const {step, headers, collection, disabled} = this.state

    const rows = collection.length
    return (
      <div>
        <div>
          <ul className="pt-breadcrumbs">
            {step.length > 0 && (
              <li onClick={this.handleLeave}>
                <a className="pt-breadcrumb-current">Back</a>
              </li>
            )}
            {step.map((step, index, array) => (
              <li key={index}>
                <a className="pt-breadcrumb">{step}</a>
              </li>
            ))}
          </ul>
          <ButtonGroup style={{float: 'right'}}>
            <Button icon="code" disabled={rows === 0 || disabled.cell}>Show cell as JSON</Button>
            <Button icon="code" disabled={rows === 0}>Show row as JSON</Button>
            <Button icon="zoom-in" disabled={rows === 0 || disabled.collection}>
              Show sub collection table
            </Button>
          </ButtonGroup>
          <div style={{clear: 'both', marginBottom: '15px'}}/>
        </div>
        <Table
          numRows={rows}
          onFocusedCell={this.handleFocusedCell}
          onSelection={console.log}
          selectionModes={[]}
          enableFocusedCell>
          {headers.map((header, i) =>
            <Column
              key={header}
              name={header}
              cellRenderer={this.renderCell}
              columnHeaderCellRenderer={this.renderHeader.bind(this, header)}
            />,
          )}
        </Table>

      </div>
    )
  }

  renderHeader(header) {
    //todo fixme: row = 0
    const [_, __, ___, ____, row] = this.state.collection

    if (row) {
      const cell = row[header]

      if (cell !== null && !Array.isArray(cell) && typeof cell === 'object') {
        return <ColumnHeaderCell name={header} menuRenderer={this.renderMenu.bind(this)} isActive/>
      }
    }
    return <ColumnHeaderCell name={header}/>
  }

  renderMenu(col) {
    return (
      <Menu>
        <MenuItem icon="fork" onClick={() => this.showSubTable(col)} text="Enter JSON"/>
      </Menu>
    )
  }

  renderCell = (rowIndex, columnIndex) => {
    const row = this.state.collection[rowIndex]
    const header = this.state.headers[columnIndex]
    const cell = row[header]
    const content = this.content(row, header)

    if (Array.isArray(cell)) {
      return <Cell style={{backgroundColor: 'red'}}>{content}</Cell>
    } else if (cell !== null && typeof cell === 'object') {
      return <Cell style={{backgroundColor: 'green'}}>{content}</Cell>
    }
    return <Cell>{content}</Cell>
  }

  content(row, header) {
    return RowModel.content(row[header])
  }

  handleFocusedCell = ({col, row, focusSelectionIndex}) => {
    const header = this.state.headers[col]
    const cell = this.state.collection[row][header]

    if (Array.isArray(cell)) {
      this.setState({
        disabled: {
          cell      : false,
          collection: false,
        },
      })
      return this.handleEnter(header, cell)
    } else if (cell !== null && typeof cell === 'object') {
      this.setState({
        disabled: {
          cell      : false,
          collection: true,
        },
      })
    } else {
      this.setState({
        disabled: {
          cell      : true,
          collection: true,
        },
      })
    }
  }
  showSubTable = (col: number) => {
    return this.handleEnter(this.state.headers[col])
  }
}
interface State {
  step: string[]
  headers: string[]
  collection: any[]
  disabled: {
    cell: boolean
    collection: boolean
  }
}
