import React from 'react'
import cx from 'classnames'

export class Select extends React.Component<Props, State> {
  static defaultProps = {
    default    : '',
  }
  readonly state = {
    selected: '',
  }

  render() {
    const {title, description, disabled, children, name, className} = this.props

    return <div className={cx('bp3-label', className)}>
      {title && <h3 className="mv2">{title}</h3>}
      <div className="bp3-select w-100">
        <select onChange={this.handleChange} defaultValue={this.props.default} disabled={disabled} name={name}>
          {description && <option key="__unselected" value="">
            {description}
          </option>}
          {children}
        </select>
      </div>
    </div>
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
  onChange(ev): any
  name?: string
  title?: string
  default?: string
  description?: string
  disabled?: boolean
  className?: string
}
interface State {
  selected: string
}
