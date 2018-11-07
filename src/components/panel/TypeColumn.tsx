import classnames from 'classnames'
import {Select} from '../Select'

export const TypeColumn: React.SFC<TypeColumn> = props =>
  <Select
    // name={props.name}
    className={classnames('w-10 mh2', props.className)}
    // type={props.type}
    // placeholder={props.placeholder}
    // disabled={props.disabled}
    default="S"
    onChange={console.log}
  >
    <option key={0} value="S">S</option>
  </Select>

interface TypeColumn {
  name: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
}

