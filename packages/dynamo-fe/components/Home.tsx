import * as React from 'react'
import {StackableJsonTableComponent} from './StackableJsonTable'

declare const ipc

export class HomeComponent extends React.Component<Props, State> {
  state = {
    tables: [],
    keys: [],
    items: []
  }
  render() {
    const {keys, items} = this.state
    return (
      <div>
        <StackableJsonTableComponent keys={keys} collection={items} />
      </div>
    )
  }

  componentDidMount() {
    ipc.on('channel', (_, items, keys) => {
      console.log('received')
      this.setState({
        keys,
        items
      })
    })
    ipc.send('channel', 'ping')
  }
}

interface Props {
}
interface State {
}