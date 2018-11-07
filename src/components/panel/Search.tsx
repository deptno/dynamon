import React, {Component} from 'react'
import classnames from 'classnames'
import {Tab, Tabs} from '@blueprintjs/core'
import {Select} from '../Select'
import {Scan} from './Scan'
import {Query} from './Query'

export class Search extends Component {
  readonly state = {
    tabId: 'scan'
  }
  render() {
    const {tabId} = this.state

    return <div className="ma3">
      <Select title="Indexes" onChange={console.log} description="Select Index" default="default">
        <option key={1} value="default">Default Index</option>
        <option key={2} value="gsi">GSI: byTheWay</option>
        <option key={3} value="lsi">LSI: mayNotGood</option>
      </Select>
      <Tabs id="TabsExample" selectedTabId={tabId} onChange={(next, prev) => {
        this.setState({tabId: next})
      }}>
        <Tab id="scan" className="f5" title="Scan" panel={<Scan/>}/>
        <Tab id="query" className="f5" title="Query" panel={<Query/>}/>
        <Tabs.Expander/>
        <div className="bp3-button-group bp3-align-right bp3-minimal">
          <button className={classnames('bp3-button bp3-icon-search bp3-minimal')}/>
        </div>
      </Tabs>
    </div>
  }
}
