import React from 'react'
import {IRowHeaderCellProps, RowHeaderCell} from '@blueprintjs/table'
import {ContextMenuTarget, Menu, MenuItem} from '@blueprintjs/core'

@ContextMenuTarget
export class ContextMenuRowCellComponent extends RowHeaderCell {
  renderContextMenu() {
    return (
      <Menu>
        <MenuItem onClick={this.handleDelete} text={`Delete Document(${this.props.index})`}/>
      </Menu>
    )
  }
  handleDelete = () => {
    (this.props as any).onDelete(this.props.index)
  }
}

export const TypedRowCell: React.Factory<{onDelete(rowIndex: number): void} & IRowHeaderCellProps> = ContextMenuRowCellComponent as any
