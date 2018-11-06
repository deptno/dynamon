import React from 'react'

export const TableStateDescription: React.SFC<Props> = props =>
  <div className="bp3-non-ideal-state" style={{marginTop: '45px'}}>
    <div className="bp3-non-ideal-state-visual bp3-non-ideal-state-icon">
      <span className="bp3-icon bp3-icon-th"></span>
    </div>
    <h4 className="bp3-non-ideal-state-title">{props.description}</h4>
  </div>

interface Props {
  description: string
}
