import classnames from 'classnames'

export const ConditionColumn: React.SFC<ConditionColumn> = props =>
  <input
    name={props.name}
    className={classnames('bp3-input mh2', props.className)}
    type={props.type}
    placeholder={props.placeholder}
    disabled={props.disabled}
  />

interface ConditionColumn {
  name: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
}

