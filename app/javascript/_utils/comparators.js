export const dateTimeComparator = (a, b) => {
  if (!a) {
    return -1
  } else if (!b) {
    return 1
  } else {
    return new Date(a) > new Date(b) ? 1 : -1
  }
}
