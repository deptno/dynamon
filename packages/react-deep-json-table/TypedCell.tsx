import * as React from 'react'
import {Cell, ICellProps} from '@blueprintjs/table'
import {ContextMenuTarget, Menu, MenuItem} from '@blueprintjs/core'

@ContextMenuTarget
export class ContextMenuCellComponent extends Cell {
  renderContextMenu() {
    return (
      <Menu>
        <MenuItem onClick={this.handleDelete} text={`Delete Row(${this.props.rowIndex + 1})`}/>
      </Menu>
    )
  }
  handleDelete = () => {
    (this.props as any).onDelete(this.props.rowIndex)
  }
}

export const TypedCell: React.Factory<{onDelete(rowIndex: number): void} & ICellProps> = ContextMenuCellComponent as any
