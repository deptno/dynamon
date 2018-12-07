import React, {useEffect, useState} from 'react'
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
const mapStateToProps = (state: RootState) => ({
  table: state.dynamon.table,
  documents: state.dynamon.documents
})
const mapDispatchToProps = actions
export const DynamoTable = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(
  (props: Props) => {
    const [keys, setKeys] = useState([])
    const {table, documents, onItemSelected, onRefresh, createDocument, createDocuments, deleteDocument, readDocuments} = props
    useEffect(() => {
      if (!table) {
        return
      }
      setKeys(table.KeySchema
        .sort((p, c) => p.KeyType === 'HASH_KEY' ? 1 : 0)
        .map(key => key.AttributeName))
    }, [table])

    const handleOnEdit = async (prev, next) => {
      console.log('handleOnEdit()', prev, next)
      await createDocument(next)
      // @todo fixme
      setTimeout(() => {
        readDocuments(table.TableName)
      }, 500)
    }
    const handleOnItemDelete = async item => {
      const key = R.pick(table.KeySchema.map(k => k.AttributeName), item)
      await deleteDocument(key)
      readDocuments(table.TableName)
    }
    const writeRows = async data => {
      const records = Array.isArray(data) ? data : [data]
      await createDocuments(records)
      readDocuments(table.TableName)
    }

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
                onEdit={handleOnEdit}
              />}>
                <button className="bp3-button bp3-icon-add bp3-intent-primary bp3-inline bp3-minimal"/>
              </Popover>
              <Popover>
                <button className="bp3-button bp3-icon-add-to-artifact bp3-intent-primary bp3-inline bp3-minimal"/>
                <Editor schema={table.KeySchema} onSave={writeRows}/>
              </Popover>
            </>
            }
          </div>
        </label>
        {documents
          ? documents.length > 0
            ? <StackableJsonTableComponent
              keyOrder={keys}
              collection={documents}
              onItemSelect={onItemSelected}
              onItemDelete={handleOnItemDelete}
            />
            : <TableStateDescription description="Empty"/>
          : <TableStateDescription description="Select Table"/>
        }
        <div className="mb4"/>
      </div>
    )
  },
)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
interface OwnProps {
  onItemSelected?(json): void
  onRefresh?(): void
}
type Props = StateProps & DispatchProps & OwnProps
