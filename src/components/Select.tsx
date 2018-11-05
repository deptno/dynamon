import React from 'react'
import {Popover} from '@blueprintjs/core'
import {TableDescription} from './TableDescription'
import {PopoverButton} from './PopoverButton'
import {TableCreator} from './TableCreator'

declare module 'react' {
  export function createRef<T extends HTMLElement = HTMLElement>(): T
}

export class SelectComponent extends React.Component<Props, State> {
  static defaultProps = {
    default: '',
  }
  readonly state = {
    selected: '',
  }
  rSelect = React.createRef<HTMLSelectElement>()

  render() {
    const {
            title,
            description,
            disabled,
            children,
            handleOnZoom,
            handleOnCreate,
            handleOnDelete,
            handleOnRefresh,
          } = this.props
    return (
      <div>
        <label className="bp3-label bp3-inline">
          {title}
          <div className="bp3-select">
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
        <div className="bp3-button-group bp3-align-right bp3-minimal">
          {handleOnRefresh && <button
            type="button"
            className={`bp3-button bp3-icon-refresh bp3-intent-primary bp3-inline`}
          />}
          {handleOnZoom && <PopoverButton
            content={<TableDescription name={this.state.selected}/>}
            icon="zoom-in"
            color="primary"
            disabled={!this.state.selected}
          />}
          {handleOnCreate && <PopoverButton
            content={<TableCreator />}
            icon="add"
            color="success"
          />}
          {handleOnDelete && <button
            type="button"
            className={`bp3-button bp3-icon-remove bp3-intent-danger bp3-inline`}
            disabled={!this.state.selected}
            onClick={() => {
              if (confirm('Do you want to delete table?')) {
                alert('Deleted')
              }
            }}
          />}
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
  handleOnZoom?(ev): void
  handleOnCreate?(ev): void
  handleOnDelete?(ev): void
  handleOnRefresh?(ev): void
}
interface State {
  selected: string
}
