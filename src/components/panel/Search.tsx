import React, {Component} from 'react'
import classnames from 'classnames'
import {Tab, Tabs} from '@blueprintjs/core'
import {Select} from '../Select'
import {Scan} from './Scan'
import {Query} from './Query'

export class Search extends Component<Props> {
  readonly state = {
    tabId: 'scan',
    tabs: true
  }
  render() {
    const {className} = this.props
    const {tabId, tabs} = this.state

    console.log(tabs)
    return <div className={classnames('ma3', className)}>
      <Select title="Indexes" onChange={console.log} description="Select Index" default="default">
        <option key={1} value="default">Default Index</option>
        <option key={2} value="gsi">GSI: byTheWay</option>
        <option key={3} value="lsi">LSI: mayNotGood</option>
      </Select>
      <Tabs id="TabsExample" selectedTabId={tabId} onChange={this.handleTabChange}>
        <Tab id="scan" className="f5" title="Scan" panel={tabs && <Scan/>}/>
        <Tab id="query" className="f5" title="Query" panel={tabs && <Query/>}/>
        <Tabs.Expander/>
        <div className="bp3-button-group bp3-align-right bp3-minimal">
          <button className={classnames('bp3-button bp3-icon-search bp3-minimal bp3-intent-primary')}/>
          <button
            type="button"
            className={classnames('bp3-button bp3-icon-minus bp3-minimal bp3-intent-warning')}
            onClick={this.handleTabsShow}
          />
        </div>
      </Tabs>
    </div>
  }
  handleTabChange = tabId => this.setState({tabId})
  handleTabsShow = ev => this.setState({tabs: !this.state.tabs})
}

interface Props {
  className?: string
}
