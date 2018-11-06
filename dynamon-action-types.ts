export enum EDynamonActionTypes {
  WS_CONNECTED      = 'ws connected',
  ADD_ENDPOINT      = 'add endpoint',

  CONNECTED         = 'connected',

  SET_TABLE         = 'set table',
  READ_ENDPOINTS    = 'read endpoints',
  OK_READ_ENDPOINTS = 'ok read endpoints',

  READ_TABLES       = 'read tables',
  OK_READ_TABLES    = 'ok read tables',

  CREATE_TABLE      = 'create table',
  OK_CREATE_TABLE   = 'ok create table',
  READ_TABLE        = 'read table',
  UPDATE_TABLE      = 'update table',
  DELETE_TABLE      = 'delete table',
  OK_DELETE_TABLE   = 'ok delete table',

  CREATE_RECORDS    = 'create records',
  READ_RECORDS      = 'read records',
  OK_READ_RECORDS   = 'ok read records',
  UPDATE_RECORDS    = 'update records',
  DELETE_RECORDS    = 'delete records',

  CREATE_RECORD     = 'create record',
  UPDATE_RECORD     = 'update record',
  DELETE_RECORD     = 'delete record',
}