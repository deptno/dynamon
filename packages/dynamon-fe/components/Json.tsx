import * as React from 'react'
import RJV, {RJVModified} from 'react-json-view'
import classnames from 'classnames'
import {EditorComponent} from './Editor'

export class JsonComponent extends React.Component<Props, State> {
  static defaultProps = {
    title: 'JSON'
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.src !== prevState.src) {
      return {
        src  : nextProps.src,
        dirty: false,
      }
    }
    return null
  }

  readonly state = {
    expend: false,
    dirty : false,
    src   : {},
  }

  render() {
    const {expend, dirty, src} = this.state

    return (
      <div style={expend ? {} : {maxHeight: '300px', overflow: 'scroll'}}>
        <label className="pt-label pt-inline" style={{marginTop: '10px', marginBottom: 0}}>
          {this.props.title}
          <button
            className={classnames('pt-button pt-icon-confirm pt-minimal', {'pt-intent-success': dirty})}
            onClick={this.handleApplyChanges}
            disabled={!dirty}
          />
          <button
            type="button"
            className={classnames('pt-button pt-minimal', {
              'pt-intent-success': !expend,
              'pt-icon-maximize' : !expend,
              'pt-intent-danger' : expend,
              'pt-icon-minimize' : expend,
            })}
            onClick={this.handleSize}
          />
        </label>
        {!src && (
          <RJV
            src={src}
            name={null}
            theme="ocean"
            iconStyle="circle"
            indentWidth={2}
            displayDataTypes={false}
            onEdit={this.props.onEdit && this.handleEdit}
            onAdd={this.props.onEdit && this.handleEdit}
            onDelete={this.props.onEdit && this.handleEdit}
          />
        )}
        {src && <EditorComponent src={src}/>}
      </div>
    )
  }

  handleApplyChanges = () => {
    this.props.onEdit(this.props.src, this.state.src)
    this.setState({dirty: false})
  }

  handleEdit = (data: RJVModified) => {
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