import React from 'react'
import copy from 'clipboard-copy'
import * as R from 'ramda'
import {DeepJsonTableComponent} from './DeepJsonTable'
import {RowModel} from './Row'
import {Cell, Column, ColumnHeaderCell, RegionCardinality, RowHeaderCell, Table} from '@blueprintjs/table'
import {Button, ButtonGroup, Menu, MenuItem} from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/table/lib/css/table.css'

export class BlueprintDJTComponent extends DeepJsonTableComponent<Props, State> {
  static getDerivedStateFromProps(nextProps, _) {
    const headers = nextProps.keyOrder
      .concat(
        Array
          .from(new Set(R.flatten(nextProps.data.map(Object.keys))))
          .filter(header => !nextProps.keyOrder.some(key => header === key))
      )
      // .sort((a, b) => {
      //
      // })
    return {
      step      : [],
      collection: nextProps.data,
      headers,
    }
  }

  readonly state = {
    step      : [],
    headers   : [],
    collection: [],
    disabled  : {
      cell      : true,
      collection: true,
      enter     : true,
    },
    json      : null,
  }
  private position: [number, number] = [0, 0]

  render() {
    const {step, headers, collection, json, disabled} = this.state
    const rows = collection.length

    return (
      <div>
        {/*<ul className="pt-breadcrumbs">*/}
        {/*{step.map((step, index, array) => (*/}
        {/*<li key={index}>*/}
        {/*<a className="pt-breadcrumb">{step}</a>*/}
        {/*</li>*/}
        {/*))}*/}
        {/*</ul>*/}
        <ButtonGroup>
          <Button type="button" icon="code" disabled={rows === 0} onClick={this.showRowAsJson}>
            Show row as JSON
          </Button>
          <Button type="button" icon="code" disabled={rows === 0 || disabled.cell} onClick={this.showCellAsJson}>
            Show cell as JSON
          </Button>
          <Button type="button"
                  icon="zoom-in"
                  disabled={rows === 0 || disabled.collection}
                  onClick={this.showColumnsAsTable}
          >
            Show columns as table
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
        <Table
          numRows={rows}
          numFrozenColumns={this.props.keyOrder.length}
          onFocusedCell={this.handleFocusedCell}
          onSelection={(x) => console.log('handleOnSelect', x)}
          selectionModes={[RegionCardinality.CELLS]}
          rowHeaderCellRenderer={this.renderRowHeaderCell}
          enableColumnReordering
          enableFocusedCell
        >
          {headers.map((header, i) =>
            <Column
              key={header}
              name={header}
              cellRenderer={this.renderCell}
              columnHeaderCellRenderer={this.renderHeader.bind(this, header)}
            />,
          )}
        </Table>
        <Button className="w-100 mt3" rightIcon="arrow-right" intent="success" text="Next" disabled/>
      </div>
    )
  }

  showCellAsJson = () => {
    console.log('showCellAsJson')
    const [row, col] = this.position
    this.setState({json: this.state.collection[row][this.state.headers[col]]})
  }

  showRowAsJson = () => {
    //todo: RJV
    console.log('showRowAsJson')
    const [row] = this.position
    this.setState({json: this.state.collection[row]})
  }

  showColumnsAsTable = () => {
    console.log('showColumnsAsTable')
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
    const row = this.state.collection[4]

    if (row) {
      const cell = row[header]

      if (cell !== null && !Array.isArray(cell) && typeof cell === 'object') {
        return <ColumnHeaderCell name={header} menuRenderer={this.renderMenu.bind(this)} isActive/>
      }
    }
    return <ColumnHeaderCell name={header}/>
  }

  renderRowHeaderCell = (rowIndex: number) => {
    return (
      <RowHeaderCell style={{textAlign: 'center'}} index={rowIndex} menuRenderer={this.renderRowHeaderCellMenu}>
        <small>{rowIndex}</small>
      </RowHeaderCell>
    )
  }

  renderRowHeaderCellMenu = (index) => {
    return (
      <Menu>
        <MenuItem onClick={() => this.props.onDelete(index)} text={`Delete Document(${index})`}/>
      </Menu>
    )
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
    const rowData = this.state.collection[row]
    const cell = rowData[header]

    copy(cell).then(() => console.log('copied'))

    if (Array.isArray(cell)) {
      this.setState({
        disabled: {
          cell      : false,
          collection: false,
          enter     : true,
        },
      })
      this.props.onItemSelected(cell)
    } else if (cell !== null && typeof cell === 'object') {
      this.setState({
        disabled: {
          cell      : false,
          collection: true,
          enter     : false,
        },
      })
      this.props.onItemSelected(cell)
    } else {
      this.setState({
        disabled: {
          cell      : true,
          collection: true,
          enter     : true,
        },
      })
      this.props.onItemSelected(rowData)
    }
    this.position = [row, col]
  }
}
interface Props {
  keyOrder: string[]
  onDelete(rowIndex: number): void
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
  json: JSX.Element
}
