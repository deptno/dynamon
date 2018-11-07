import React, {Component} from 'react'
import {Radio, RadioGroup} from '@blueprintjs/core'

export class RadioOrder extends Component<{}, State> {
  readonly state = {
    order: EOrder.ASC,
  }

  render() {
    const {order} = this.state
    return <RadioGroup label="Order" onChange={this.handleOrderChange} selectedValue={order} inline>
      <Radio label="Ascending" value={EOrder.ASC}/>
      <Radio label="Descending" value={EOrder.DESC}/>
    </RadioGroup>
  }

  handleOrderChange = ev => {
    this.setState({
      order: this.state.order === EOrder.DESC
        ? EOrder.ASC
        : EOrder.DESC,
    })
  }
}

interface State {
  order: EOrder
}

enum EOrder {
  DESC = 'desc',
  ASC  = 'asc'
}
