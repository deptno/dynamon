import * as React from 'react'

export class RowComponent extends React.Component<Props, State> {
  render() {
    const {headers, data, onEnter, onRowClick} = this.props
    return data
      ? (
        <tr onClick={() => onRowClick(data)}>
          {
            headers
              .map((key, i) => {
                const column = data[key]

                let content
                if (column === undefined) {
                  content = 'undefined'
                } else if (column === null) {
                  content = 'null'
                } else if (Array.isArray(column)) {
                  content = <button onClick={() => onEnter(headers[i])}>Array</button>
                } else if (typeof column === 'object') {
                  content = <button onClick={() => onEnter(headers[i])}>JSON</button>
                } else {
                  content = column.toString()
                }
                return <td key={i}>{content}</td>
              })}
        </tr>
      )
      : null
  }
}

interface Props {
  headers: string[]
  data: any[]
  onEnter: (key: string) => void
  onRowClick: (key: object) => void
}
interface State {
}