import * as React from 'react'

export const TableStateDescription: React.SFC<Props> = props =>
  <div className="pt-non-ideal-state" style={{marginTop: '45px'}}>
    <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
      <span className="pt-icon pt-icon-th"></span>
    </div>
    <h4 className="pt-non-ideal-state-title">{props.description}</h4>
  </div>

interface Props {
  description: string
}
