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
    {
      field: 'last_name',
      value: '',
    },
    {
      field: 'first_name',
      value: '',
    },
    {
      field: 'email',
      value: '',
    },
    {
      field: 'racfid',
      value: '',
    },
  ],
  count: 0,
  users: [],
})

export const modifyTileData = (searchPageTiles, userType, payload) => {
  searchPageTiles.map(tile => {
    if (tile.title === userType) {
      tile.count = payload.meta.total
      tile.users = payload.records
    }
  })
}
