import React, {Component, createRef, FunctionComponent, useEffect, useState} from 'react'
import classnames from 'classnames'
import {Tab, Tabs} from '@blueprintjs/core'
import {Scan} from './Scan'
import {Query} from './Query'
import {actions} from '../../redux/dynamon'
import {connect} from 'react-redux'
import {RootState} from '../../redux'
import {SelectIndex} from './SelectIndex'
import * as R from 'ramda'

const scan = Array(1).fill(0).map(() => createRef()) as unknown as React.RefObject<any>[]
const query = Array(10).fill(0).map(() => createRef()) as unknown as React.RefObject<any>[]
export const SearchComponent: FunctionComponent<Props> = props => {
  const [tabId, setTabId] = useState('scan0')
  const [tabs, setTabs] = useState(true)
  const {className} = props
  const handleTabsShow = R.compose(setTabs, R.not, R.always(tabs))
  const handleSearch = ev => {
    const rxpExtractTypeId = /(\S+)([0-9]+)/
    const [_, type, id] = rxpExtractTypeId.exec(tabId)
    const ref = type === 'scan'
      ? scan[id]
      : query[id]
    const conditions = ref.current.getData()

    if (type === 'scan') {
      props.scan(conditions)
    } else if (type === 'query') {
      props.query(conditions)
    }
  }

  return <div className={classnames('ma2', className)}>
    <SelectIndex/>
    <Tabs id="TabsExample" selectedTabId={tabId} onChange={setTabId as any}>
      <Tab id="scan0" className="f5" title="Scan" panel={tabs && <Scan id={0} ref={scan[0]}/>}/>
      <Tab id="query0" className="f5" title="Query" panel={tabs && <Query id={0} ref={query[0]}/>}/>
      <Tab id="query1" className="f5" title="Q1" panel={tabs && <Query id={1} ref={query[1]}/>}/>
      <Tab id="query2" className="f5" title="Q2" panel={tabs && <Query id={2} ref={query[2]}/>}/>
      <Tab id="query3" className="f5" title="Q3" panel={tabs && <Query id={3} ref={query[3]}/>}/>
      <Tab id="query4" className="f5" title="Q4" panel={tabs && <Query id={4} ref={query[4]}/>}/>
      <Tab id="query5" className="f5" title="Q5" panel={tabs && <Query id={5} ref={query[5]}/>}/>
      <Tab id="query6" className="f5" title="Q6" panel={tabs && <Query id={6} ref={query[6]}/>}/>
      <Tab id="query7" className="f5" title="Q7" panel={tabs && <Query id={7} ref={query[7]}/>}/>
      <Tab id="query8" className="f5" title="Q8" panel={tabs && <Query id={8} ref={query[8]}/>}/>
      <Tab id="query9" className="f5" title="Q9" panel={tabs && <Query id={9} ref={query[9]}/>}/>
      <Tabs.Expander/>
      <div className="bp3-button-group bp3-align-right bp3-minimal">
        <button
          type="button"
          className={classnames('bp3-button bp3-icon-search bp3-minimal bp3-intent-primary')}
          onClick={handleSearch}
        />
        <button
          type="button"
          className={classnames('bp3-button bp3-icon-minus bp3-minimal bp3-intent-warning')}
          onClick={handleTabsShow}
        />
      </div>
    </Tabs>
  </div>
}

const mapStateToProps = (state: RootState) => state.dynamon
const mapDispatchToProps = actions
export const Search = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(SearchComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
interface OwnProps {
  className?: string
}
type Props = StateProps & DispatchProps & OwnProps

