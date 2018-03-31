import * as React from 'react'
import {RowComponent} from './Row'

export class DeepJsonTableComponent extends React.Component<Props, State> {
  static defaultProps = {
    keepHeader: []
  }

  static getDerivedStateFromProps(nextProps, _) {
    return {
      step      : [],
      headers   : nextProps.headers,
      collection: nextProps.data
    }
  }

  render() {
    const {step, headers, collection} = this.state
    return (
      <table>
        <caption>{this.caption()} {step.length > 0 && <button onClick={this.handleLeave}>back</button>}</caption>
        <thead>
        <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
        {collection.map((row, i) => <RowComponent key={i} headers={headers} data={row} onEnter={this.handleEnter}/>)}
        </tbody>
      </table>
    )
  }

  protected caption() {
    if (this.props.caption) {
      this.props.caption(this.state.step.slice(0))
    }
    return ['Object', this.state.step.join('.')]
      .filter(Boolean)
      .join('/')
  }

  private handleEnter = (key: string) => {
    const step = [...this.state.step, key]
    const collection = this.state.collection
      .map(row => this.keepHeader(row, key))
      .filter(Boolean)

    if (collection.length > 0) {
      const headers = Object.keys(collection[0])
      return this.setState({step, collection, headers})
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

  private keepHeader(row: object, key: string) {
    if (!row) {
      return null
    }

    const nextRow = row[key]
    if (!nextRow) {
      return null
    }
    if (this.props.keepHeader.length === 0) {
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
}

interface Props {
  caption?: (step: string[]) => string
  keepHeader?: string[]
  headers: string[]
  data: any[]
}
interface State {
  step: string[]
  headers: string[]
  collection: any[]
}