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

    return <div className={classnames('ma2', className)}>
      <Select title="Indexes" onChange={console.log} description="Select Index" default="default" className="mb2">
        <option key={1} value="default">Default Index</option>
        <option key={2} value="gsi">GSI: byTheWay</option>
        <option key={3} value="lsi">LSI: mayNotGood</option>
      </Select>
      <Tabs id="TabsExample" selectedTabId={tabId} onChange={this.handleTabChange}>
        <Tab id="scan" className="f5" title="Scan" panel={tabs && <Scan/>}/>
        <Tab id="query" className="f5" title="Query" panel={tabs && <Query id={0}/>}/>
        <Tab id="query1" className="f5" title="Q1" panel={tabs && <Query id={1}/>}/>
        <Tab id="query2" className="f5" title="Q2" panel={tabs && <Query id={2}/>}/>
        <Tab id="query3" className="f5" title="Q3" panel={tabs && <Query id={3}/>}/>
        <Tab id="query4" className="f5" title="Q4" panel={tabs && <Query id={4}/>}/>
        <Tab id="query5" className="f5" title="Q5" panel={tabs && <Query id={5}/>}/>
        <Tab id="query6" className="f5" title="Q6" panel={tabs && <Query id={6}/>}/>
        <Tab id="query7" className="f5" title="Q7" panel={tabs && <Query id={7}/>}/>
        <Tab id="query8" className="f5" title="Q8" panel={tabs && <Query id={8}/>}/>
        <Tab id="query9" className="f5" title="Q9" panel={tabs && <Query id={9}/>}/>
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
