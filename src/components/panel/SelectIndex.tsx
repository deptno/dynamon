import React, {FunctionComponent} from 'react'
import classnames from 'classnames'
import {Select} from '../Select'
import {actions} from '../../redux/dynamon'
import {connect} from 'react-redux'
import {RootState} from '../../redux'

export const SelectIndexComponent: FunctionComponent<Props> = props => {
  const {indexes} = props

  return <div className="">
    <Select
      title="Indexes"
      onChange={e => alert(`${e.target.value}\n@todo`)}
      default="__"
      className="mb2"
      disabled={indexes.length === 0}
    >
      <option value="__">Default Index</option>
      {indexes.map(idx =>
        <option key={idx.IndexArn} value={idx.IndexArn}>
          {idx.IndexName} ({idx.KeySchema.map(k => k.AttributeName).join(', ')})
        </option>
      )}
    </Select>
    <div className="bp3-button-group bp3-align-right bp3-minimal">
      <button
        type="button"
        className={classnames('bp3-button bp3-icon-add bp3-minimal bp3-intent-success')}
        disabled
      />
      <button
        type="button"
        className={classnames('bp3-button bp3-icon-remove bp3-minimal bp3-intent-danger')}
        disabled
      />
    </div>
  </div>
}
const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions
export const SelectIndex = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(SelectIndexComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
interface OwnProps {
  className?: string
}
type Props = StateProps & DispatchProps & OwnProps

