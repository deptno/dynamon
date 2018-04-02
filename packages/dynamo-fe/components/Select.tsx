import * as React from 'react'

export class SelectComponent extends React.Component<Props, State> {
  render() {
    const {description, onChange, children} = this.props
    return (
      <div className="pt-select pt-fill">
        <select onChange={onChange} defaultValue={'__unselected'}>
          <option key="__unselected" value={'__unselected'}>{description}</option>
          {children}
        </select>
      </div>
    )
  }
}

interface Props {
  description: string
  onChange(ev): void
}
interface State {
}