import React, {FunctionComponent, useEffect, useState} from 'react'
import cx from 'classnames'
import {RootState} from '../redux'
import {actions} from '../redux/dynamon'
import {connect} from 'react-redux'

declare module 'react' {
  export function createRef<T extends HTMLElement = HTMLElement>(): T
}

export const TableStreamComponent: FunctionComponent<Props> = props => {
  const {className, table} = props
  const [enable, setEnable] = useState(true)
  const [endpoint, setEndpoint] = useState('http://localhost:4001')
  const [connected, setConnect] = useState(false)
  if (!table) {
    return null
  }
  if (!table.StreamSpecification) {
    return null
  }
  const enabled = table.StreamSpecification.StreamEnabled
  const type = table.StreamSpecification.StreamViewType
  const handleSubmit = (e) => {
    e.preventDefault()
    if (connected) {
      props.disconnectStream(props.table.TableName)
      setConnect(false)
      return
    }
    const endpoint = e.target.elements.namedItem('endpoint')
    props.connectStream(table.TableName, endpoint.value)
    setConnect(true)
  }
  useEffect(() => {
    if (connected) {

    return () => {
      console.log('bye')
      props.disconnectStream(table.TableName)
    }
    }
  }, [connected])

  return <div className={cx('ph2 bp3-label', className)}>
    <h3 className="mv2">Table stream</h3>
    Stream enabled: {enabled.toString()}<br/>
    Stream type: {type}
    {enabled && (
      <form className="mv2 pa1 flex items-center" onSubmit={handleSubmit}>
        <input
          name="endpoint"
          className="bp3-input w-100"
          type="text"
          placeholder="function endpoint, eg. http://localhost:3001/lambda"
          value={endpoint}
          onChange={e => {
            const value = e.target.value
            setEndpoint(value)
            setEnable(value.startsWith('http://') || value.startsWith('https://'))
          }}
        />
        <button
          className={cx('ml4 b--black-80 pa2 w4', {
            'bg-green white b'      : enable,
            'bg-black-20 black-40 b': !enable,
          })}
          disabled={!enable}
        >
          {connected
            ? 'Disconnect'
            : 'Connect'
          }
        </button>
      </form>
    )}
  </div>
}
const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions
export const TableStream = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(TableStreamComponent)
type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
type Props = StateProps & DispatchProps & {
  className?: string
}
