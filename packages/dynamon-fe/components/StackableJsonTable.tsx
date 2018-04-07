import * as React from 'react'
import {BlueprintDJTComponent} from 'react-deep-json-table/BlueprintDJT'

export class StackableJsonTableComponent extends React.Component<Props, State> {
  state = {
    stack: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      stack: [
        {
          keepHeader: nextProps.keys || [],
          collection: nextProps.collection,
        },
      ],
    }
  }

  render() {
    return this.state.stack.map(({collection, keepHeader}, i) => (
      <BlueprintDJTComponent
        key={i}
        keepHeader={keepHeader}
        data={collection}
        onRowClick={this.handleRowClick}
        onEnterArray={this.handleOnEnterArray}
        onItemSelected={this.handleOnItemSelected}
      />
    ))
  }

  handleOnItemSelected = (item = this.props.collection) => {
    return this.props.onItemSelected(item)
  }

  handleRowClick(json) {
    console.dir(json)
    console.dirxml(json)
  }

  handleOnEnterArray = collection => {
    console.table(collection)
    const stack = [
      {
        collection,
      },
      ...this.state.stack,
    ]
    this.setState({stack})
  }
}

interface Props {
  keys?: string[]
  collection: any[]
  onItemSelected?(item): void
}
interface State {
  stack: Stack[]
}
interface Stack {
  collection: any[]
  keepHeader?: string[]
}
