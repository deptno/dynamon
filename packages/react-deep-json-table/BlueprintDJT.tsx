import * as React from 'react'
import {DeepJsonTableComponent} from './DeepJsonTable'
import {RowModel} from './Row'
import {Cell, Column, Table} from '@blueprintjs/table'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'

export class BlueprintDJTComponent extends DeepJsonTableComponent {
  state = {
    step: [],
    headers: [],
    collection: [],
  }

  render() {
    const {step, headers, collection} = this.state
    return (
      <div>
        <ul className="pt-breadcrumbs">
          {step.length > 0 && <li onClick={this.handleLeave}><a className="pt-breadcrumb-current">Back</a></li>}
          {step.map((step, index, array) => <li key={index}><a className="pt-breadcrumb">{step}</a></li>)}
        </ul>
        <Table
          numRows={collection.length}
          onFocusedCell={this.handleFocusedCell}
          onSelection={console.log}
          enableFocusedCell
        >
          {headers.map((header, i) => <Column key={i} name={headers[i]} cellRenderer={this.renderCell}/>)}
        </Table>
      </div>
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

    console.log(col, row, focusSelectionIndex, cell)

    if (Array.isArray(cell)) {
      return this.handleEnter(header, cell)
    } else if (cell !== null && typeof cell === 'object') {
      return this.handleEnter(header)
    }
  }
}
