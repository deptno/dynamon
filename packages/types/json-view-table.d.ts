declare module 'react-json-view' {
  export default class RJV extends React.Component<P, S> {}

  interface P<T = any> {
    src: T
    onEdit(data: RJVModified<T>): void
    onAdd(data: RJVModified<T>): void
    onDelete(data: RJVModified<T>): void
  }
  interface S {

  }

  export interface RJVModified<T> {
    existing_src: T
    updated_src: T
    name: keyof T
    namespace: any
    existing_value: T[keyof T]
    new_value: T[keyof T]
  }
}
