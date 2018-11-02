export function validate(value: string) {
  try {
    const json = JSON.parse(value)

    if (typeof json === 'object') {
      if (Array.isArray(json)) {
        return json.length > 0 && isCollection(json)
      }
      return true
    }
    return false
  } catch (ex) {
    return false
  }
}

function isCollection(object: any[]): boolean {
  return object.every(j => typeof j === 'object')
}
