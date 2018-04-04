import * as React from 'react'
import RJV from 'react-json-view'

export class JsonComponent extends React.Component<Props, State> {
  render() {
    return (
      <RJV
        src={this.props.src}
        name={null}
        theme="ocean"
        iconStyle="circle"
        indentWidth={2}
        collapsed={2}
        displayDataTypes={false}
        onEdit={this.handleEdit}
        onAdd={this.handleAdd}
        onDelete={this.handleDelete}
        onSelect={this.handleSelect}
      />
    )
  }
  handleEdit(data) {
    console.log('handleEdit')
  }
  handleAdd(data) {
    console.log('handleAdd')
  }
  handleDelete(data) {
    console.log('handleDelete')
  }
  handleSelect(data) {
    console.log('handleSelect')
  }
}

interface Props {
  src: Object|Array<any>
}
interface State {
}