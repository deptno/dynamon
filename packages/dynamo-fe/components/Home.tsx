import * as React from 'react'
import {DeepJsonTableComponent} from 'react-deep-json-table'

const data = [
  {
    a: 1,
    b:'string',
    c: true,
    d: false,
    A: {
      a: 2,
      b:'string',
      c: false,
      B: {
        a: 3,
        b:'string',
        c: true,
        D: {}
      },
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
        <DeepJsonTableComponent headers={headers} data={data} />
      </div>
    )
  }
}

interface Props {
}
interface State {
}