import React, {Component, createRef} from 'react'
import * as R from 'ramda'

export const aggregator = <P extends Props>(A: React.ComponentType<any>) => {
  return class extends Component<{id: number}> {
    private form = createRef() as any

    render() {
      return <form ref={this.form}>
        <A {...this.props} />
      </form>
    }

    getData = () => {
      const {id} = this.props
      const {elements} = this.form.current
      const properties = elements.namedItem(`property${id}`)
      const types = elements.namedItem(`type${id}`)
      const operators = elements.namedItem(`operator${id}`)
      const values = elements.namedItem(`value${id}`)
      const zip = R.zipObj(['property', 'type', 'operator', 'value'])

      return Array(properties.length)
        .fill(0)
        .reduce((ret, _, i) =>
            ret.concat(zip([properties[i].value, types[i].value, operators[i].value, values[i].value])),
          [],
        )
    }
  }
}

interface Props {
  id: number
}

