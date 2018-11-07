import classnames from 'classnames'
import {Select} from '../Select'

export const OperatorColumn: React.SFC<OperatorColumn> = props =>
  <Select
    // name={props.name}
    className={classnames('w-10 mh2', props.className)}
    // type={props.type}
    // placeholder={props.placeholder}
    // disabled={props.disabled}
    default="="
    onChange={console.log}
  >
    <option key={0} value="=">=</option>
  </Select>

interface OperatorColumn {
  name: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
}

