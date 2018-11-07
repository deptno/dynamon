import React, {Component} from 'react'
import {Radio, RadioGroup} from '@blueprintjs/core'

export class RadioOrder extends Component<{}, State> {
  readonly state = {
    order: EOrder.ASC,
  }

  render() {
    const {order} = this.state
    return <RadioGroup label="Order" onChange={this.handleOrderChange} selectedValue={order}>
      <Radio label="Ascending" value={EOrder.ASC}/>
      <Radio label="Descending" value={EOrder.DESC}/>
      <Radio label="Sandwich" value="three"/>
    </RadioGroup>
  }

  handleOrderChange = ev => {
    const order = this.state.order === 'desc' ? 'asc' : 'desc'
    this.setState({order})
  }
}

interface State {
  order: 'asc' | 'desc'
}

enum EOrder {
  DESC = 'desc',
  ASC  = 'asc'
}
