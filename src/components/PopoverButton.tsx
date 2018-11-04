import {SFC} from 'react'
import {Popover} from '@blueprintjs/core'

export const PopoverButton: React.SFC<Props> = props =>
  <Popover content={props.content}>
    <button
      type="button"
      className={`bp3-button bp3-icon-${props.icon} bp3-intent-${props.color} bp3-inline`}
      disabled={props.disabled}
    />
  </Popover>

interface Props {
  content: JSX.Element
  icon: 'zoom-in'|'remove'|'add'|'refresh'
  color: 'primary'|'success'|'danger'
  disabled?: boolean
}
