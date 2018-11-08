import classnames from 'classnames'
import {RootState} from '../../redux'

export const KeyConditionColumn: React.SFC<ConditionColumn> = props => {
  return <input
    name={props.name}
    className={classnames('bp3-input mh2', props.className)}
    placeholder={props.placeholder}
    disabled={props.disabled}
    value={props.data
      ? props.data.AttributeName
      : null
    }
  />
}

interface ConditionColumn {
  name: string
  placeholder: string
  className?: string
  disabled?: boolean
  data?: RootState['dynamon']['table']['KeySchema'][0]
}

