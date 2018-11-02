import * as React from 'react'
import {Icon} from '@blueprintjs/core'

export class LinksComponent extends React.Component<Props, State> {
  render() {
    return (
      <div className="bp3-ui-text" style={{marginBottom: '10px'}}>
        <a target="_blank" href="https://github.com/deptno/dynamon">
          <Icon icon="git-repo"/> Github
        </a> &nbsp;
        <a target="_blank" href="https://github.com/deptno/dynamon/issues/new">
          <Icon icon="issue-new"/> Report issue
        </a>
      </div>
    )
  }
}

interface Props {
}
interface State {
}