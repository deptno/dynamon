import * as React from 'react'
import {DeepJsonTableComponent} from 'react-deep-json-table'
import ReactJson from 'react-json-view'

const data = [
  {
    key : 1,
    key2: 2,
    b   : 'string',
    c   : true,
    d   : false,
    array   : [
      {
        a: 3,
        b: 'string',
        c: true,
        D: {}
      },
      {
        a: 3,
        b: 'string',
        c: true,
        D: {}
      }
    ],
    A   : {
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
    f   : null,
    g   : undefined
  },
  {
    array   : null,
    key : 2,
    key2: 4,
    b   : 'string',
    c   : true,
    d   : false,
    A   : {
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
    f   : null,
    g   : undefined
  },
  {
    array   : null,
    key : 4,
    key2: 3,
    b   : 'string',
    c   : true,
    d   : false,
    A   : {
      a: 5,
      b: 'string',
      c: false,
    },
    f   : null,
    g   : undefined
  }
]
const headers = Object.keys(data[0])

export class HomeComponent extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <DeepJsonTableComponent
          keepHeader={['key', 'key2', 'b']}
          headers={headers}
          data={data}
          onRowClick={this.handleRowClick}
          onEnterArray={this.handleOnEnterArray}
        />
        <ReactJson src={data[0]} theme={'monokai'}/>
      </div>
    )
  }

  handleRowClick(json) {
    console.dir(json)
    console.dirxml(json)
  }

  handleOnEnterArray(array) {
    console.table(array)
  }
}

interface Props {
}
interface State {
}