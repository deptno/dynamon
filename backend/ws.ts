import WebSocket from 'ws'
import R from 'ramda'
import {EDynamonActionTypes as Action} from '../dynamon-action-types'

export const createWs = (): Promise<(type: Action, payload?: any) => void> => {
  const server = new WebSocket.Server({port: 5945})
  return new Promise(r => {
    server.on('connection', ws => {
      const send = ws.send.bind(ws)
      const dispatch = R.compose(send, JSON.stringify, handler)

      ws.on('message', R.compose(dispatch, JSON.parse))
      dispatch({type: Action.WS_CONNECTED})
      r(dispatch)
    })
  })
}

const handler = (action) => {
  const {type, payload} = action
  switch (type) {
    case Action.READ_ENDPOINTS: {
      return {type: Action.OK_READ_ENDPOINTS, payload: ENDPOINTS}
    }
  }
  return action
}
const ENDPOINTS = [
  {name: 'US East (Ohio)', region: 'us-east-2', endpoint: 'dynamodb.us-east-2.amazonaws.com'},
  {name: 'US East (N. Virginia)', region: 'us-east-1', endpoint: 'dynamodb.us-east-1.amazonaws.com'},
  {name: 'US West (N. California)', region: 'us-west-1', endpoint: 'dynamodb.us-west-1.amazonaws.com'},
  {name: 'US West (Oregon)', region: 'us-west-2', endpoint: 'dynamodb.us-west-2.amazonaws.com'},
  {name: 'Asia Pacific (Tokyo)', region: 'ap-northeast-1', endpoint: 'dynamodb.ap-northeast-1.amazonaws.com'},
  {name: 'Asia Pacific (Seoul)', region: 'ap-northeast-2', endpoint: 'dynamodb.ap-northeast-2.amazonaws.com'},
  {name: 'Asia Pacific (Osaka-Local)', region: 'ap-northeast-3', endpoint: 'dynamodb.ap-northeast-3.amazonaws.com'},
  {name: 'Asia Pacific (Mumbai)', region: 'ap-south-1', endpoint: 'dynamodb.ap-south-1.amazonaws.com'},
  {name: 'Asia Pacific (Singapore)', region: 'ap-southeast-1', endpoint: 'dynamodb.ap-southeast-1.amazonaws.com'},
  {name: 'Asia Pacific (Sydney)', region: 'ap-southeast-2', endpoint: 'dynamodb.ap-southeast-2.amazonaws.com'},
  {name: 'Canada (Central)', region: 'ca-central-1', endpoint: 'dynamodb.ca-central-1.amazonaws.com'},
  {name: 'China (Beijing)', region: 'cn-north-1', endpoint: 'dynamodb.cn-north-1.amazonaws.com.cn'},
  {name: 'China (Ningxia)', region: 'cn-northwest-1', endpoint: 'dynamodb.cn-northwest-1.amazonaws.com.cn'},
  {name: 'EU (Frankfurt)', region: 'eu-central-1', endpoint: 'dynamodb.eu-central-1.amazonaws.com'},
  {name: 'EU (Ireland)', region: 'eu-west-1', endpoint: 'dynamodb.eu-west-1.amazonaws.com'},
  {name: 'EU (London)', region: 'eu-west-2', endpoint: 'dynamodb.eu-west-2.amazonaws.com'},
  {name: 'EU (Paris)', region: 'eu-west-3', endpoint: 'dynamodb.eu-west-3.amazonaws.com'},
  {name: 'South America (Sao Paulo)', region: 'sa-east-1', endpoint: 'dynamodb.sa-east-1.amazonaws.com'},
  {name: 'AWS GovCloud (US)', region: 'us-gov-w', endpoint: 'st-1	dynamodb.us-gov-west-1.amazonaws.com'},
]
