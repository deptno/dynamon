import React, {FunctionComponent, useState} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Json} from './Json'
import {DynamoTable} from './DynamoTable'
import {actions} from '../redux/dynamon'
import {SelectTable} from './SelectTable'
import {SelectEndpoint} from './EndpointSelect'
import {Search} from './panel/Search'
import * as R from 'ramda'

export const HomeComponent: FunctionComponent<Props> = props => {
  const [json, setJson] = useState(null)
  const handleJsonEdit = async (prev, next) => {
    console.log('before edit', prev, 'after edit', next)
    await this.props.updateDocument(props.selectedTable, next)
    this.props.readDocuments(props.table.TableName)
    if (!next) {
      if (confirm('delete row?')) {
        // @todo delete row
        console.log('@todo delete row')
      }
    }
  }
  const handleOnRefreshRecords = () => {
    if (!this.props.selectedTable.startsWith('__')) {
      this.props.readDocuments(this.props.selectedTable)
    }
  }

  return (
    <div>
      <div className="bp3-control-group bp3-fill">
        <SelectEndpoint/>
        <SelectTable/>
      </div>
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
