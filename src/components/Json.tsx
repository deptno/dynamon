import React from 'react'
import classnames from 'classnames'
import dynamic from 'next/dynamic'

const JSONView = dynamic(() => import('react-json-view'), {ssr: false})

export class Json extends React.Component<Props, State> {
  static defaultProps = {
    title: 'JSON',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.src !== prevState.src) {
      if (nextProps.src) {
        return {
          src  : nextProps.src,
          dirty: false,
        }
      }
    }
    return null
  }

  readonly state = {
    expend: false,
    dirty : false,
    src: {
      NOTICE: 'Select document'
    }
  }

  render() {
    const {expend, dirty, src} = this.state
    const style = expend
      ? {minHeight: '22em', overflow: 'scroll'}
      : {height: '22em', overflow: 'scroll'}

    return (
      <div style={style} className="ma2">
        <label className="bp3-label bp3-inline pb1" style={{marginTop: '10px', marginBottom: 0}}>
          <h3 className="ma2">{this.props.title}</h3>
          <button
            className={classnames('bp3-button bp3-icon-confirm bp3-minimal', {'bp3-intent-success': dirty})}
            onClick={this.handleApplyChanges}
            disabled={!dirty}
          />
          <button
            type="button"
            className={classnames('bp3-button bp3-minimal', {
              'bp3-intent-success': !expend,
              'bp3-icon-maximize' : !expend,
              'bp3-intent-danger' : expend,
              'bp3-icon-minimize' : expend,
            })}
            onClick={this.handleSize}
          />
        </label>
        <div className="overflow-auto word-normal w-100">
          <JSONView
            src={src}
            defaultValue="select document"
            name={null}
            theme="ocean"
            iconStyle="circle"
            indentWidth={2}
            displayDataTypes={false}
            onEdit={this.props.onEdit && this.handleEdit}
            onAdd={this.props.onEdit && this.handleEdit}
            onDelete={this.props.onEdit && this.handleEdit}
          />
        </div>
      </div>
    )
  }

  handleApplyChanges = () => {
    this.props.onEdit(this.props.src, this.state.src)
    this.setState({dirty: false})
  }

  handleEdit = (data) => {
    console.log('handleEdit', data)
    if (data.existing_value !== data.new_value) {
      this.setState({dirty: true, src: data.updated_src})
    }
  }

  handleSize = () => {
    this.setState({expend: !this.state.expend})
  }
}

interface Props {
  title?: string
  src: Object | Array<any>
  onEdit?(prev, next): void
}
interface State {
  expend: boolean
  dirty: boolean
  src: any
}