import * as React from 'react'
import {DeepJsonTableComponent} from './DeepJsonTable'
import {RowModel} from './Row'
import {Cell, Column, ColumnHeaderCell, RegionCardinality, Table} from '@blueprintjs/table'
import {Button, ButtonGroup, Classes, Menu, MenuItem} from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'

export class BlueprintDJTComponent extends DeepJsonTableComponent<State> {
  state = {
    step      : [],
    headers   : [],
    collection: [],
    disabled  : {
      cell      : true,
      collection: true,
      enter     : true,
    },
  }
  private position: [number, number] = [0, 0]

  render() {
    const {step, headers, collection, disabled} = this.state

    const rows = collection.length
    return (
      <div>
        <div>
          <ul className="pt-breadcrumbs">
            {step.map((step, index, array) => (
              <li key={index}>
                <a className="pt-breadcrumb">{step}</a>
              </li>
            ))}
          </ul>
          <ButtonGroup>
            <Button type="button" icon="code" disabled={rows === 0} onClick={this.showRowAsJson}>
              Show row as JSON
            </Button>
            <Button type="button" icon="code" disabled={rows === 0 || disabled.cell} onClick={this.showCellAsJson}>
              Show cell as JSON
            </Button>
            <Button
              type="button"
              icon="zoom-in"
              disabled={rows === 0 || disabled.collection}
              onClick={this.showColumnsAsCollection}
            >
              Show columns as collection
            </Button>
            <Button
              type="button"
              icon="maximize"
              disabled={rows === 0 || disabled.enter}
              onClick={this.enterJson}
            >
              Enter JSON
            </Button>
            <Button icon="minimize" disabled={step.length === 0} onClick={this.handleLeave}>Leave</Button>
          </ButtonGroup>
          <div style={{clear: 'both', marginBottom: '15px'}}/>
        </div>
        <Table
          numRows={rows}
          onFocusedCell={this.handleFocusedCell}
          onSelection={console.log}
          selectionModes={[RegionCardinality.CELLS]}
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

  showCellAsJson = () => {
    //todo: RJV
    console.log('showCellAsJson')
  }

  showRowAsJson = () => {
    //todo: RJV
    console.log('showRowAsJson')
  }

  showColumnsAsCollection = () => {
    console.log('showColumnsAsCollection')
    const [row, col] = this.position
    const header = this.state.headers[col]
    this.handleEnter(header, this.state.collection[row][header])
  }

  enterJson = () => {
    console.log('enterJson')
    const [_, col] = this.position
    this.handleEnter(this.state.headers[col])
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
        <MenuItem icon="maximize" onClick={this.enterJson} text="Enter JSON"/>
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
          enter     : true,
        },
      })
      // return this.handleEnter(header, cell)
    } else if (cell !== null && typeof cell === 'object') {
      this.setState({
        disabled: {
          cell      : false,
          collection: true,
          enter     : false,
        },
      })
    } else {
      this.setState({
        disabled: {
          cell      : true,
          collection: true,
          enter     : true,
        },
      })
    }
    this.position = [row, col]
    console.log(row, col)
  }
}
interface State {
  step: string[]
  headers: string[]
  collection: any[]
  disabled: {
    cell: boolean
    collection: boolean
    enter: boolean
  }
}
