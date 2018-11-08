import classnames from 'classnames'
import {Select} from '../Select'

export const OperatorColumn: React.SFC<OperatorColumn> = props =>
  <Select
    name={props.name}
    className={classnames('w-10 mh2', props.className)}
    // type={props.type}
    // placeholder={props.placeholder}
    default="eq"
    onChange={console.log}
    disabled={props.disabled}
  >
    {operatorList[props.type].map(([op, value]) => <option key={op} value={value}>{op}</option>)}
  </Select>

const S = [
  ['=', 'eq'],
  ['<>', 'ne'],
  ['<', 'lt'],
  ['<=', 'le'],
  ['>', 'gt'],
  ['>=', 'ge'],
  ['between', 'between'],
  ['exists', 'exists'],
  ['not_exists', 'notExists'],
  ['contains', 'contains'],
  ['not_contains', 'notContains'],
  ['begins_with', 'beginsWith'],
]
const N = [
  ['=', 'eq'],
  ['<>', 'ne'],
  ['<', 'lt'],
  ['<=', 'le'],
  ['>', 'gt'],
  ['>=', 'ge'],
  ['between', 'between'],
  ['exists', 'exists'],
  ['not_exists', 'notExists'],
]
const B = S
const BOOL = [
  ['=', 'eq'],
  ['<>', 'ne'],
  ['exists', 'exists'],
  ['not_exists', 'notExists'],
]
const NULL = [
  ['exists', 'exists'],
  ['not_exists', 'notExists'],
]
const operatorList = {S, N, B, BOOL, NULL}

export type TOperatorType = keyof typeof operatorList
interface OperatorColumn {
  name: string
  type: TOperatorType
  placeholder: string
  className?: string
  disabled?: boolean
}

