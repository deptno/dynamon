import React, {FunctionComponent, useEffect, useState} from 'react'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import * as R from 'ramda'

const JSONView = dynamic(() => import('react-json-view'), {ssr: false})
export const Json: FunctionComponent<Props> = props => {
  const {title = 'JSON'} = props
  const [expend, setExpend] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [src, setSrc] = useState(null)
  const style = expend
    ? {minHeight: '22em', overflow: 'scroll'}
    : {height: '22em', overflow: 'scroll'}
  const handleApplyChanges = () => {
    console.log('handleApplyChanges')
    props.onEdit(props.src, src)
    setDirty(false)
  }
  const handleEdit = (data) => {
    console.log('handleEdit', data)
    if (data.existing_value !== data.new_value) {
      setDirty(true)
      setSrc(data.updated_src)
    }
  }
  const handleSize = R.compose(setExpend, R.not, R.always(expend))

  useEffect(() => setSrc(props.src), [props.src])

  return (
    <div style={style} className="ma2">
      <label className="bp3-label bp3-inline pb1" style={{marginTop: '10px', marginBottom: 0}}>
        <h3 className="ma2">{title}</h3>
        <div className="bp3-button-group bp3-align-right bp3-minimal">
          <button
            className={classnames('bp3-button bp3-icon-confirm bp3-minimal', {'bp3-intent-success': dirty})}
            onClick={handleApplyChanges}
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
            onClick={handleSize}
          />
        </div>
      </label>
      <div className="overflow-auto word-normal w-100">
        {src
          ? <JSONView
            src={src}
            defaultValue="select document"
            name={null}
            theme="ocean"
            iconStyle="circle"
            indentWidth={2}
            displayDataTypes={false}
            onEdit={props.onEdit && handleEdit}
            onAdd={props.onEdit && handleEdit}
            onDelete={props.onEdit && handleEdit}
          />
          : <p>Select Item</p>
        }
      </div>
    </div>
  )
}

interface Props {
  title?: string
  src: Object | Array<any>
  onEdit?(prev, next): void
}
