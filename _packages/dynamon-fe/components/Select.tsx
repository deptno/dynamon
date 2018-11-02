import * as React from 'react'
import {Popover} from '@blueprintjs/core'
import {TableDescription} from './TableDescription'

declare module 'react' {
  export function createRef<T extends HTMLElement = HTMLElement>(): T
}

export class SelectComponent extends React.Component<Props, State> {
  static defaultProps = {
    default: '',
  }
  readonly state = {
    selected: ''
  }
  rSelect = React.createRef<HTMLSelectElement>()

  render() {
    const {title, description, disabled, children, onZoom} = this.props
    return (
      <div>
        <label className="pt-label pt-inline">
          {title}
          <div className="pt-select">
            <select
              onChange={this.handleChange}
              defaultValue={this.props.default}
              disabled={disabled}
              style={{paddingRight: '200px'}}
            >
              <option key="__unselected" value="">
                {description}
              </option>
              {children}
            </select>
          </div>
        </label>
        <div className="pt-button-group pt-align-right pt-minimal">
          <button type="button" className="pt-button pt-icon-add pt-intent-success"/>
          <button type="button" className="pt-button pt-icon-refresh pt-intent-danger pt-inline"/>
          {this.state.selected && onZoom && (
            <Popover content={<TableDescription name={this.state.selected}/>}>
              <button
                type="button"
                className="pt-button pt-icon-zoom-in pt-intent-primary pt-inline"
              />
            </Popover>
          )}
        </div>
      </div>
    )
  }

  handleChange = (e) => {
    const selected = e.target.value
    if (!selected.startsWith('__')) {
      this.setState({selected: e.target.value})
    }
    this.props.onChange(e)
  }
}

interface Props {
  title: string
  default?: string
  description: string
  disabled?: boolean
  onChange(ev): any
  onZoom?(ev): void
}
interface State {
  selected: string
}
