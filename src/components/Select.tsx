import React from 'react'

export class Select extends React.Component<Props, State> {
  static defaultProps = {
    default: '',
  }
  readonly state = {
    selected: '',
  }

  render() {
    const {title, description, disabled, children} = this.props

    return <label className="bp3-label">
      <h3 className="mv2">{title}</h3>
      <div className="bp3-select">
        <select onChange={this.handleChange} defaultValue={this.props.default} disabled={disabled}>
          <option key="__unselected" value="">
            {description}
          </option>
          {children}
        </select>
      </div>
    </label>
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
}
interface State {
  selected: string
}
