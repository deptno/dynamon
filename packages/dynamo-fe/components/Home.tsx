import * as React from 'react'
import {DeepJsonTableComponent} from 'react-deep-json-table'

const data = [
  {
    key: 1,
    key2: 2,
    b: 'string',
    c: true,
    d: false,
    A: {
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
    f: null,
    g: undefined
  },
  {
    key: 2,
    key2: 4,
    b: 'string',
    c: true,
    d: false,
    A: {
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
    f: null,
    g: undefined
  },
  {
    key: 4,
    key2: 3,
    b: 'string',
    c: true,
    d: false,
    A: {
      a: 5,
      b: 'string',
      c: false,
    },
    f: null,
    g: undefined
  }
]
const headers = Object.keys(data[0])

export class HomeComponent extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <DeepJsonTableComponent keepHeader={['key', 'key2', 'b']} headers={headers} data={data}/>
      </div>
    )
  }
}

interface Props {
}
interface State {
}