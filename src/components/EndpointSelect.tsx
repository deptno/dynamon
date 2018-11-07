import React from 'react'
import {Select} from './Select'
import {actions} from '../redux/dynamon'
import {RootState} from '../redux'
import {connect} from 'react-redux'

class EndpointTableComponent extends React.Component<Props, State> {
  readonly state = {
    selected: '',
  }

  render() {
    const {props} = this
    const {loadingEndpoints, endpoints} = props
    const description = loadingEndpoints
      ? 'Built-in DynamoDB initializing...'
      : `Select endpoint from ${endpoints.length} endpoints`

    return <div className="ph2">
      <Select title="Endpoint" description={description} onChange={this.handleOnEndpointChange}>
        {endpoints.map(({name, endpoint}) => <option key={endpoint} value={endpoint}>{name}</option>)}
      </Select>
      <div className="bp3-button-group bp3-align-right bp3-minimal mt2">
        <button
          type="button"
          className={`bp3-button bp3-icon-refresh bp3-intent-primary bp3-inline`}
          onClick={this.handleOnRefresh}
        />
      </div>
    </div>
  }

  componentDidMount() {
    this.handleOnRefresh()
  }

  handleOnEndpointChange = ev => {
    const value = ev.target.value
    if (!value.startsWith('__')) {
      const endpoint = this.props.endpoints.find(({endpoint}) => endpoint === value)
      if (endpoint) {
        this.props.readTables(endpoint)
      }
    }
    // @todo add what?? @_@;
    console.log(value)
  }

  handleOnRefresh = () => {
    this.props.readEndpoints()
  }
}
const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions

export const SelectEndpoint = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(EndpointTableComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
type Props = StateProps & DispatchProps

interface State {
  selected: string
}
