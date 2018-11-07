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
    {operatorList[props.type].map(op => <option key={op} value={op}>{op}</option>)}
  </Select>

const S = ['=', '<>', '<', '<=', '>', '>=', 'between', 'exists', 'not_exists', 'contains', 'not_contains', 'begins_with']
const N = ['=', '<>', '<', '<=', '>', '>=', 'between', 'exists', 'not_exists']
const B = ['=', '<>', '<', '<=', '>', '>=', 'between', 'exists', 'not_exists', 'contains', 'not_contains', 'begins_with']
const BOOL = ['=', '<>', 'exists', 'not_exists']
const NULL = ['exists', 'not_exists']
const operatorList = {S, N, B, BOOL, NULL}

export type TOperatorType = keyof typeof operatorList
interface OperatorColumn {
  name: string
  type: TOperatorType
  placeholder: string
  className?: string
  disabled?: boolean
}

