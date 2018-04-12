import * as React from 'react'
import {BlueprintDJTComponent} from '../../react-deep-json-table/BlueprintDJT'

export class StackableJsonTableComponent extends React.Component<Props, State> {
  readonly state = {
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
        keyOrder={this.props.keyOrder}
        keepHeader={keepHeader}
        data={collection}
        onRowClick={this.handleRowClick}
        onEnterArray={this.handleOnEnterArray}
        onItemSelected={this.handleOnItemSelected}
        onDelete={this.handleOnDelete}
      />
    ))
  }

  handleOnItemSelected = (item = this.props.collection) => {
    console.log('selected', item)
    return this.props.onItemSelect(item)
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
  handleOnDelete = rowIndex => {
    if (this.props.onItemDelete) {
      this.props.onItemDelete(this.props.collection[rowIndex])
    }
  }
}

interface Props {
  keyOrder?: string[]
  keys?: string[]
  collection: any[]
  onItemSelect?(item): void
  onItemDelete?(item): void
}
interface State {
  stack: Stack[]
}
interface Stack {
  collection: any[]
  keepHeader?: string[]
}
