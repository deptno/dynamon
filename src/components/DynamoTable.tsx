import React from 'react'
import {StackableJsonTableComponent} from './StackableJsonTable'
import {Popover} from '@blueprintjs/core'
import {TableStateDescription} from './TableStateDescription'
import {Json} from './Json'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Actions, actions} from '../redux/dynamon'
import dynamic from 'next/dynamic'
import * as R from 'ramda'

const Editor = dynamic(() => import('./Editor'), {ssr: false})

class DynamoTableComponent extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, _) {
    if (nextProps.table) {
      return {
        keys: nextProps.table.KeySchema
          .sort((p, c) => p.KeyType === 'HASH_KEY' ? 1 : 0)
          .map(key => key.AttributeName),
      }
    }
    return null
  }

  readonly state = {
    keys: [],
  }

  render() {
    const {table, documents, onItemSelected, onRefresh} = this.props

    return (
      <div className="pa3">
        <label className="bp3-label bp3-inline">
          <h3 className="ma0">Records</h3>
          <div className="bp3-button-group bp3-align-right bp3-minimal">
            {table && <>
              <button
                type="button"
                onClick={onRefresh}
                className="bp3-button bp3-icon-refresh bp3-intent-primary bp3-inline bp3-minimal"
                disabled={!documents}
              />
              <Popover content={<Json
                title="Add record"
                src={table.KeySchema.reduce((p, c) => {
                  p[c.AttributeName] = `input valid(type: string) ${c.AttributeName}`
                  return p
                }, {})}
                onEdit={this.handleOnEdit}
              />}>
                <button className="bp3-button bp3-icon-add bp3-intent-primary bp3-inline bp3-minimal"/>
              </Popover>
              <Popover>
                <button className="bp3-button bp3-icon-add-to-artifact bp3-intent-primary bp3-inline bp3-minimal"/>
                <Editor schema={table.KeySchema} onSave={this.writeRows}/>
              </Popover>
            </>
            }
          </div>
        </label>
        {documents
          ? documents.length > 0
            ? <StackableJsonTableComponent
              keyOrder={this.state.keys}
              collection={documents}
              onItemSelect={onItemSelected}
              onItemDelete={this.handleOnItemDelete}
            />
            : <TableStateDescription description="Empty"/>
          : <TableStateDescription description="Select Table"/>
        }
        <div className="mb4" />
      </div>
    )
  }

  handleOnEdit = async (prev, next) => {
    console.log('handleOnEdit()', prev, next)
    await this.props.createDocument(next)
    // @todo fixme
    setTimeout(() => {
      this.props.readDocuments(this.props.table.TableName)
    }, 500)
  }
  handleOnItemDelete = async item => {
    const key = R.pick(this.props.table.KeySchema.map(k => k.AttributeName), item)
    await this.props.deleteDocument(key)
    this.props.readDocuments(this.props.table.TableName)
  }
  writeRows = async data => {
    const records = Array.isArray(data) ? data : [data]
    await this.props.createDocuments(records)
    this.props.readDocuments(this.props.table.TableName)
  }
}

const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions
export const DynamoTable = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DynamoTableComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
interface OwnProps {
  onItemSelected?(json): void
  onRefresh?(): void
}
type Props = StateProps & DispatchProps & OwnProps
interface State {
}
