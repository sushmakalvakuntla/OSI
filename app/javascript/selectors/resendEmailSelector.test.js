import { disableResendEmailButton, selectResendEmailUserId } from './resendEmailSelector'

describe('#selectResendEmailUserId', () => {
  it('returns resendEmailUserId', () => {
    const state = {
      resendRegistrationEmail: {
        resendEmailUserId: 'id1',
        resubmittedDate: null,
      },
    }
    expect(selectResendEmailUserId(state)).toEqual('id1')
  })

  it('returns null when there is no state', () => {
    const state = {}
    expect(selectResendEmailUserId(state)).toBe(null)
  })
})

describe('#disableResendEmailButton', () => {
  it('selects true when resendEmailUserId.length > 0', () => {
    const state = {
      fetchDetails: {
        details: {
          XHRStatus: 'ready',
          records: {
            user: { id: 'id1' },
          },
        },
        fetching: false,
        error: null,
      },
      resendRegistrationEmail: {
        resendEmailUserId: ['id1', 'id2', 'id3'],
        registrationResentDateTime: { user_id: 'SOME_ID', last_registration_resubmit_date_time: '2018-10-23 10:20:30' },
        fetching: false,
        error: null,
        resubmittedDate: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(true)
  })

  it('selects false when resendEmailUserId.length < 0', () => {
    const state = {
      fetchDetails: {
        details: {
          XHRStatus: 'ready',
          records: {
            user: { id: 'id1' },
          },
        },
        fetching: false,
        error: null,
      },
      resendRegistrationEmail: {
        resendEmailUserId: [],
        registrationResentDateTime: { user_id: 'SOME_ID' },
        fetching: false,
        error: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(false)
  })

  it('selects false when userDetailsId is not equal to resendEmailUserId', () => {
    const state = {
      fetchDetails: {
        details: {
          XHRStatus: 'ready',
          records: {
            user: { id: 'id1' },
          },
        },
        fetching: false,
        error: null,
      },
      resendRegistrationEmail: {
        resendEmailUserId: ['id3', 'id2'],
        registrationResentDateTime: { user_id: 'SOME_ID', last_registration_resubmit_date_time: '2018-10-23 10:20:30' },
        fetching: false,
        error: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(false)
  })
})
