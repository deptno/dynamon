import * as React from 'react'
import {StackableJsonTableComponent} from './StackableJsonTable'

export class HomeComponent extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <StackableJsonTableComponent/>
      </div>
    )
  }

}

interface Props {
}
interface State {
}