import React, {FunctionComponent, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Json} from './Json'
import {DynamoTable} from './DynamoTable'
import {actions} from '../redux/dynamon'
import {SelectTable} from './SelectTable'
import {SelectEndpoint} from './EndpointSelect'
import {Search} from './panel/Search'
import {TableStream} from './Stream'

export const HomeComponent: FunctionComponent<Props> = props => {
  const [connectable, setConnectable] = useState(false)
  const [json, setJson] = useState(null)
  const handleJsonEdit = async (prev, next) => {
    console.log('before edit', prev, 'after edit', next)
    await props.updateDocument(props.selectedTable, next)
    props.readDocuments(props.table.TableName)
    if (!next) {
      if (confirm('delete row?')) {
        // @todo delete row
        console.log('@todo delete row')
      }
    }
  }
  const handleOnRefreshRecords = () => {
    if (!props.selectedTable.startsWith('__')) {
      props.readDocuments(props.selectedTable)
    }
  }

  useEffect(() => {
    if (props.table) {
      const enabled = props.table.StreamSpecification.StreamEnabled
      if (enabled) {
        const localTable = props.table.TableArn.split('/')[0].endsWith('000000000000:table')
        if (localTable) {
          setConnectable(true)
          return () => {
            setConnectable(false)
          }
        }
      }
    }
  }, [props.table])

  return (
    <div>
      <div className="bp3-control-group bp3-fill">
        <SelectEndpoint/>
        <SelectTable/>
      </div>
      {connectable && <TableStream />}
      <Search/>
      <Json title="Document" src={json} onEdit={handleJsonEdit}/>
      <DynamoTable onItemSelected={setJson} onRefresh={handleOnRefreshRecords}/>
    </div>
  )
}

const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions
export const Home = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(HomeComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
type Props = StateProps & DispatchProps
