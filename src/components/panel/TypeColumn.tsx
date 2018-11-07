import classnames from 'classnames'
import {Select} from '../Select'

export const TypeColumn: React.SFC<TypeColumn> = props =>
  <Select
    className={classnames('w-10 mh2', props.className)}
    default="S"
    onChange={props.onChange}
  >
    <option value="S">S</option>
    <option value="N">N</option>
    <option value="B">B</option>
    <option value="BOOL">BOOL</option>
    <option value="NULL">NULL</option>
  </Select>

interface TypeColumn {
  name: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
  onChange(e): void
}

