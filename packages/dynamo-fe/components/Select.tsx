import * as React from 'react'

export class SelectComponent extends React.Component<Props, State> {
  static defaultProps = {
    default: ''
  }
  render() {
    const {title, description, onChange, disabled, children} = this.props
    return (
      <label className="pt-label pt-inline">
        {title}
        <div className="pt-select">
          <select onChange={onChange} defaultValue={this.props.default} disabled={disabled} style={{paddingRight: '200px'}}>
            <option key="__unselected" value="">
              {description}
            </option>
            {children}
          </select>
        </div>
        <div className="pt-button-group pt-align-right pt-minimal">
          <button type="button" className="pt-button pt-icon-add pt-intent-success"/>
          <button type="button" className="pt-button pt-icon-refresh pt-intent-danger pt-inline"/>
        </div>
      </label>
    )
  }
}

interface Props {
  title: string
  default?: string
  description: string
  disabled?: boolean
  onChange(ev): void
}
interface State {
}
