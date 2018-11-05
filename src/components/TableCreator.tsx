import React, {createRef} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import classnames from 'classnames'
import {actions} from '../redux/dynamon'

export class TableCreatorComponent extends React.Component<Props, State> {
  private refForm = createRef<HTMLFormElement>()

  render() {
    const dirty = true
    return <div
      style={{minWidth: '400px', minHeight: '300px', overflow: 'scroll'}}
      className="pa2"
    >
      <label className="bp3-label bp3-inline" style={{marginTop: '10px', marginBottom: 0}}>
        <h2 className="ma2">Create Table</h2>
      </label>
      <button
        className={classnames('bp3-button bp3-icon-confirm bp3-minimal', {'bp3-intent-success': dirty})}
        onClick={(a) => {
          const {elements} = this.refForm.current
          const {tableName, hashKey, hashKeyType, rangeKey, rangeKeyType, wCapacity, rCapacity} = elements
          for (const {name, value, placeholder} of elements) {
            if (!value && !name.startsWith('range')) {
              return alert(`${placeholder || name} is required`)
            }
          }
          if (confirm('Do you want to create table?')) {
            // @todo dispatch create table
            const params = {
              TableName            : tableName.value,
              KeySchema            : [{
                AttributeName: hashKey.value,
                KeyType      : 'HASH',
              }],
              AttributeDefinitions : [{
                AttributeName: hashKey.value,
                AttributeType: hashKeyType.value,
              }],
              ProvisionedThroughput: {
                ReadCapacityUnits : parseInt(rCapacity.value),
                WriteCapacityUnits: parseInt(wCapacity.value),
              },
            }
            if (rangeKey) {
              params.KeySchema.push({
                AttributeName: rangeKey.value,
                KeyType      : 'RANGE',
              })
              params.AttributeDefinitions.push({
                AttributeName: rangeKey.value,
                AttributeType: rangeKeyType.value,
              })
            }
            this.props.createTable(params)
          }
        }}
        disabled={!dirty}
      />
      <form className="mv2 pa1" ref={this.refForm as any}>
        <input name="tableName" className="bp3-input w-100" type="text" placeholder="Table name"/>
        <input name="hashKey" className="bp3-input w-70" type="text" placeholder="Hash key name"/>
        <select name="hashKeyType" className="bp3-input bp3-select w-30">
          <option key="N" value="N">Number</option>
          <option key="S" value="S">String</option>
          <option key="B" value="B" disabled>Binary</option>
        </select>
        <input name="rangeKey" className="bp3-input w-70" type="text" placeholder="Range key name(Optional)"/>
        <select name="rangeKeyType" className="bp3-input bp3-select w-30">
          <option key="N" value="N">Number</option>
          <option key="S" value="S">String</option>
          <option key="B" value="B" disabled>Binary</option>
        </select>
        <input name="wCapacity" className="bp3-input w-100" type="number" placeholder="Write capacity" min={1} max={20}
               defaultValue="1"/>
        <input name="rCapacity" className="bp3-input w-100" type="number" placeholder="Read capacity" min={1} max={20}
               defaultValue="1"/>
      </form>
    </div>
  }
}

const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions
export const TableCreator = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(TableCreatorComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
interface OwnProps {
}
interface Props extends StateProps, DispatchProps, OwnProps {
}
interface State {
}