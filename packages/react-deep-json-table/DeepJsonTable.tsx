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

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps')
    return {
      step      : [],
      headers   : nextProps.headers,
      collection: nextProps.data
    }
  }

  private handleEnter = (key: string) => {
    console.log('handleEnter', key)
    const step = [...this.state.step, key]
    const collection = this.state.collection
      .map(row => row[key])
      .filter(Boolean)
    const headers = Object.keys(collection[0])

    this.setState({step, collection, headers})
  }

  private handleLeave = () => {
    const step = this.state.step.slice(0, -1)
    const collection = this.props.data
      .map(row => step.reduce((p, c) => p[c], row))
      .filter(Boolean)
    const headers = Object.keys(collection[0])
    console.log('handleEnter')
    console.log(step)
    console.table(collection)

    this.setState({step, collection, headers})
  }

  componentDidUpdate() {
    console.log(this.state)
  }
}

interface Props {
  headers: string[]
  data: any[]
}
interface State {
  step: string[]
  headers: string[]
  collection: any[]
}