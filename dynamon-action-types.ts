export enum EDynamonActionTypes {
  WS_CONNECTED       = 'ws connected',
  ADD_ENDPOINT       = 'add endpoint',

  CONNECTED          = 'connected',

  SET_TABLE          = 'set table',
  READ_ENDPOINTS     = 'read endpoints',
  OK_READ_ENDPOINTS  = 'ok read endpoints',

  READ_TABLES        = 'read tables',
  OK_READ_TABLES     = 'ok read tables',

  CREATE_TABLE       = 'create table',
  OK_CREATE_TABLE    = 'ok create table',
  READ_TABLE         = 'read table',
  UPDATE_TABLE       = 'update table',
  DELETE_TABLE       = 'delete table',
  OK_DELETE_TABLE    = 'ok delete table',

  CREATE_DOCUMENTS   = 'create documents',
  OK_CREATE_DOCUMENTS   = 'ok create documents',
  READ_DOCUMENTS     = 'read documents',
  OK_READ_DOCUMENTS  = 'ok read documents',
  UPDATE_DOCUMENTS   = 'update documents',
  DELETE_DOCUEMTNS   = 'delete documents',

  CREATE_DOCUMENT    = 'create document',
  OK_CREATE_DOCUMENT = 'ok create document',
  UPDATE_DOCUMENT    = 'update document',
  OK_UPDATE_DOCUMENT    = 'ok update document',
  DELETE_DOCUMENT    = 'delete document',
  OK_DELETE_DOCUMENT = 'ok delete document',

  CONNECT_STREAM     = 'connect stream',
  DISCONNECT_STREAM     = 'disconnect stream',

  SCAN               = 'scan',
  OK_SCAN            = 'ok scan',
  QUERY              = 'query',
  OK_QUERY           = 'ok query',
}