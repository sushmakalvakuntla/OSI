export const getTilesInitialState = (userType, action, fieldType1, value1, fieldType2, value2) => ({
  title: userType,
  type: action,
  tilesQuery: [
    {
      field: fieldType1,
      value: value1,
    },
    {
      field: fieldType2,
      value: value2,
    },
  ],
  count: 0,
})

export const modifyTileData = (searchPageTiles, userType, payload) => {
  searchPageTiles.map(tile => {
    if (tile.title === userType) {
      tile.count = payload.meta.total
    }
  })
}
