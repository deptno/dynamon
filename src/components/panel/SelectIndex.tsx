import React, {Component} from 'react'
import classnames from 'classnames'
import {Select} from '../Select'
import {actions} from '../../redux/dynamon'
import {connect} from 'react-redux'
import {RootState} from '../../redux'

export class SelectIndexComponent extends Component<Props> {
  render() {
    const {table} = this.props
    return <div className="ph2">
      <Select title="Indexes" onChange={console.log} default="default" className="mb2" disabled>
        <option value="default">Default Index</option>
        {table && [...table.GlobalSecondaryIndexes, ...table.LocalSecondaryIndexes]
          .map(idx =>
            <option value={idx.IndexArn}>{idx.IndexName} ({idx.KeySchema.map(k => k.AttributeName).join(', ')})</option>,
          )
        }
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

