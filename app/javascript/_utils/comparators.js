export const dateTimeComparator = (a, b) => {
  return new Date(a) > new Date(b) ? 1 : -1
}
