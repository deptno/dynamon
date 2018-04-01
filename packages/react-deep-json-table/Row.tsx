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
                  content = (
                    <p>
                      <button onClick={() => onEnter(headers[i], column)}>Array</button>
                      {JSON.stringify(column)}
                    </p>
                  )
                } else if (typeof column === 'object') {
                  content = (
                    <p>
                      <button onClick={() => onEnter(headers[i])}>JSON</button>
                      {JSON.stringify(column)}
                    </p>
                  )
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
  onEnter: (key: string, array?: any[]) => void
  onRowClick: (key: object) => void
}
interface State {
}