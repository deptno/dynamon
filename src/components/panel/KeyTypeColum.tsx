import classnames from 'classnames'
import {Select} from '../Select'
import {RootState} from '../../redux'

export const KeyTypeColumn: React.SFC<TypeColumn> = props => {
  return <Select
    name={props.name}
    className={classnames('w-10 mh2', props.className)}
    default={props.data.AttributeType}
    onChange={props.onChange}
    disabled={props.disabled}
  >
    <option value="S">S</option>
    <option value="N">N</option>
    <option value="B">B</option>
    <option value="BOOL">BOOL</option>
    <option value="NULL">NULL</option>
  </Select>
}

interface TypeColumn {
  name: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
  data?: RootState['dynamon']['keys'][0]
  onChange(e): void
}

