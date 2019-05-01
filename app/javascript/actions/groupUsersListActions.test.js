import { fetchGroupUsersList } from './groupUsersListActions'
import { FETCH_GROUP_USERS_API_CALL_REQUEST } from './actionTypes'

describe('GroupUsersList actions', () => {
  describe('#fetchGroupUsersList', () => {
    it('returns type and payload', () => {
      const query = { f: 1 }
      const size = 5
      expect(fetchGroupUsersList(query, size)).toEqual({
        type: FETCH_GROUP_USERS_API_CALL_REQUEST,
        payload: { query, size },
      })
    })
  })
})
