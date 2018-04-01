import * as React from 'react'
import {StackableJsonTableComponent} from './StackableJsonTable'

declare const ipc

export class HomeComponent extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <StackableJsonTableComponent/>
      </div>
    )
  }

  componentDidMount() {
    ipc.on('channel', (_, a) => {
      console.log(a)
    })
    ipc.send('channel', 'ping')
  }
}

interface Props {
}
interface State {
}