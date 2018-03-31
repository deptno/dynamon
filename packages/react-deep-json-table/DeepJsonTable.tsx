import * as React from 'react'
import {RowComponent} from './Row'

export class DeepJsonTableComponent extends React.Component<Props, State> {
  render() {
    const {step, headers, collection} = this.state
    return (
      <table>
        {step.length > 0 && <caption onClick={this.handleLeave}>{step[step.length - 1]}</caption>}
        <thead>
        <tr>
          {headers.map(header => <th key={header}>{header}</th>)}
        </tr>
        </thead>
        <tbody>
        {collection.map((row, i) =>
          <RowComponent key={i} headers={headers} data={row} onEnter={this.handleEnter}/>
        )}
        </tbody>
      </table>
    )
  }

  static getDerivedStateFromProps(nextProps, _) {
    return {
      step      : [],
      headers   : nextProps.headers,
      collection: nextProps.data
    }
  }

  private handleEnter = (key: string) => {
    const step = [...this.state.step, key]
    const collection = this.state.collection
      .map(row => this.keepHeader(row, key))
      .filter(Boolean)
    const headers = Object.keys(collection[0])

    this.setState({step, collection, headers})
  }

  private keepHeader(row: object, key: string) {
    const nextRow = row[key]

    if (!nextRow) {
      return null
    } else if (this.props.keepHeader.length === 0) {
      return nextRow
    } else if (Object.keys(nextRow).length === 0) {
      return nextRow
    }
    return {
      ...this.props.keepHeader.reduce((p, keep) => {
        const key = `#${keep}`
        p[key] = row[key] || row[keep]
        return p
      }, {}),
      ...nextRow
    }
  }

  private handleLeave = () => {
    const step = this.state.step.slice(0, -1)
    const collection = this.props.data
      .map(row => step.reduce((p, c) => this.keepHeader(p, c), row))
      .filter(Boolean)
    const headers = Object.keys(collection[0])

    this.setState({step, collection, headers})
  }

  componentDidUpdate() {
    console.log(this.state)
  }
}

interface Props {
  keepHeader: string[]
  headers: string[]
  data: any[]
}
interface State {
  step: string[]
  headers: string[]
  collection: any[]
}