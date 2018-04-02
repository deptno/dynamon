import * as React from 'react'
import {BlueprintDJTComponent} from 'react-deep-json-table/BlueprintDJT'

export class StackableJsonTableComponent extends React.Component<Props, State> {
  state = {
    stack: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      stack: [{
        keepHeader: nextProps.keys || [],
        collection: nextProps.collection
      }]
    }
  }

  render() {
    return (
      <div>
        {this.state.stack.map(({collection, keepHeader}, i) =>
          <BlueprintDJTComponent
            key={i}
            keepHeader={keepHeader}
            data={collection}
            onRowClick={this.handleRowClick}
            onEnterArray={this.handleOnEnterArray}
          />
        )}
      </div>
    )
  }

  handleRowClick(json) {
    console.dir(json)
    console.dirxml(json)
  }

  handleOnEnterArray = (collection) => {
    console.table(collection)
    const stack = [
      {
        collection
      },
      ...this.state.stack
    ]
    this.setState({stack})
  }
}

interface Props {
  keys?: string[]
  collection: any[]
}
interface State {
  stack: Stack[]
}
interface Stack {
  collection: any[]
  keepHeader?: string[],
}

function getData() {
  return [
    {
      key  : 1,
      key2 : 2,
      b    : 'string',
      c    : true,
      d    : false,
      array: [
        {
          a: 3,
          b: 'string',
          c: true,
          D: {
            a: 4,
            b: 'string',
            c: true,
          }
        },
        {
          a: 3,
          b: 'string',
          c: true,
          D: {}
        }
      ],
      A    : {
        a: 2,
        b: 'string2',
        c: false,
        B: {
          a: 3,
          b: 'string',
          c: true,
          D: {},
          E: {
            a: 3,
            b: 'string',
            c: true,
            D: {}
          }
        },
      },
      f    : null,
      g    : undefined
    },
    {
      array: null,
      key  : 2,
      key2 : 4,
      b    : 'string',
      c    : true,
      d    : false,
      A    : {
        a: 5,
        b: 'string',
        c: false,
        B: {
          a: 6,
          b: 'string',
          c: true,
          D: {},
          E: {
            a: 3,
            b: 'string',
            c: true,
            D: {}
          }
        },
      },
      f    : null,
      g    : undefined
    },
    {
      array: null,
      key  : 4,
      key2 : 3,
      b    : 'string',
      c    : true,
      d    : false,
      A    : {
        a: 5,
        b: 'string',
        c: false,
      },
      f    : null,
      g    : undefined
    }
  ]
}