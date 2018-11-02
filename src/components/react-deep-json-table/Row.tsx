import React from 'react'
import {JSONFormat} from '@blueprintjs/table'

export class RowComponent extends React.Component<Props, State> {
  render() {
    const {headers, data, onEnter, onRowClick} = this.props
    return data ? (
      <tr onClick={() => onRowClick(data)}>
        {headers.map((key, i) => <td key={i}>{RowModel.content(data[key])}</td>)}
      </tr>
    ) : null
  }
}

export class RowModel {
  static content(column) {
    if (column === undefined) {
      return 'undefined'
    } else if (column === null) {
      return 'null'
    } else if (Array.isArray(column)) {
      return <JSONFormat>{JSON.stringify(column)}</JSONFormat>
    } else if (typeof column === 'object') {
      return <JSONFormat>{JSON.stringify(column)}</JSONFormat>
    } else {
      return column.toString()
    }
  }
}

interface Props {
  headers: string[]
  data: any[]
  onEnter: (key: string, array?: any[]) => void
  onRowClick: (key: object) => void
}
interface State {}
