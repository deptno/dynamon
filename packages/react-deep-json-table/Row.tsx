import * as React from 'react'

export class RowComponent extends React.Component<Props, State> {
  render() {
    const {headers, data, onEnter} = this.props
    return data
      ? (
        <tr>
          {Object.values(data).map((column: any, i) => {
            let content
            if (column === undefined) {
              content = 'undefined'
            } else if (column === null) {
              content = 'null'
            } else if (typeof column === 'object') {
              if (Object.keys(column).length > 0) {
                content = <button onClick={() => onEnter(headers[i])}>JSON</button>
              } else {
                content = '{}'
              }
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
}
interface State {
}