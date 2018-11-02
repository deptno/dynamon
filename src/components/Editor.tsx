import * as React from 'react'
import {findDOMNode} from 'react-dom'

import {editor} from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/gotoError/gotoError.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
import 'monaco-editor/esm/vs/language/json/monaco.contribution'

import {validate} from '../lib/validator'
import {KeySchema} from 'aws-sdk/clients/dynamodb'
import {Intent, Menu, MenuItem} from '@blueprintjs/core'


export class EditorComponent extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps, prevState) {
    let src, modified: string

    try {
      src = modified = JSON.stringify(nextProps.src, null, 2)
    } catch (ex) {
      src = modified = 'invalid JSON'
    }

    return {src, modified}
  }

  readonly state = {
    mount: false,
    valid: false,
  }
  private editor

  render() {
    const {valid, mount} = this.state
    if (!mount) {
      return null
    }
    return (
      <div style={{width: '600px', height: '600px'}}>
        <label className="bp3-label bp3-inline" style={{marginTop: '10px', marginBottom: 0}}>
          Write valid JSON(Schema|Schema[]), collection will create multiple rows
        </label>
        <Menu>
          <MenuItem intent={Intent.SUCCESS} text="Write" icon="confirm" onClick={this.handleApplyChanges} disabled={!valid} />
        </Menu>
      </div>
    )
  }

  componentDidMount() {
    this.setState({mount: true}, () => {
      this.editor = editor.create(findDOMNode(this), {
        theme   : 'vs-dark',
        language: 'json',
        value   : [
          '[',
          '  {',
          this.props.schema
            .map(key => `    "${key.AttributeName}": null`)
            .join(',\n'),
          '  }',
          ']',
        ].join('\n'),
      })
      this.editor.onDidChangeModelContent((a) => {
        const value = this.editor.getValue()
        const valid = validate(value)

        if (valid !== this.state.valid) {
          this.setState({valid})
        }
      })
    })
  }

  handleApplyChanges = () => {
    this.props.onSave(JSON.parse(this.editor.getValue()))
  }
}

(window as any).MonacoEnvironment = {
  getWorkerUrl(moduleId, label) {
    return './editor.worker.js'
  },
}

interface Props {
  schema: KeySchema
  onSave?(json: object | any[]): void
}
interface State {
  mount: boolean
  valid: boolean
}