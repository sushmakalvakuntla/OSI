const sanitizeValue = (string, allowRegex) => {
  if (allowRegex == null) throw new Error('regex must not be null')
  let sanitizedStr = ''
  if (string) {
    const characterArray = string.split('')
    sanitizedStr = characterArray.filter(character => character.match(allowRegex)).join('')
  }
  return sanitizedStr
}
export { sanitizeValue }
