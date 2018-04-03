import * as React from 'react'

export class SelectComponent extends React.Component<Props, State> {
  render() {
    const {title, description, onChange, disabled, children} = this.props
    return (
      <label className="pt-label pt-inline">
        {title}
        <div className="pt-select pt-fill">
          <select onChange={onChange} defaultValue="" disabled={disabled}>
            <option key="__unselected" value="">{description}</option>
            {children}
          </select>
        </div>
      </label>
    )
  }
}

interface Props {
  title: string
  description: string
  disabled?: boolean
  onChange(ev): void
}
interface State {
}