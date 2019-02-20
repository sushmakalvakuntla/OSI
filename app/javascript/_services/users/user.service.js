import ApiService from '../api'

class UserService {
  static fetch(lastName) {
    return ApiService.get(`/user_list?last_name=${lastName}`).then(response => response.data)
  }

  static search({ query = [], sort = [], size = 10, from = 0 }) {
    const q = encodeURIComponent(JSON.stringify({ query, sort, size, from }))
    return ApiService.get(`/user_list?q=${q}`).then(({ data }) => data)
  }

  static auditEvents({ query = [], sort = [], size = 100, from = 0 }) {
    const q = encodeURIComponent(JSON.stringify({ query, sort, size: 100, from }))
    return ApiService.get(`/audit_events?q=${q}`).then(({ data }) => data)
  }

  static fetchUserDetails(id) {
    return ApiService.get(`/user_detail/${id}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          throw error.response.data
        }
      })
  }

  static validateUser(email, racfid) {
    return ApiService.get(`/verify_user?email=${encodeURIComponent(email)}&racfid=${racfid}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          throw error.response.data
        }
      })
  }

  static saveUserDetails(id, updatedDetails) {
    return ApiService.patch(`/user_detail/${id}/save_user`, updatedDetails)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          throw error.response.data
        }
      })
  }

  static fetchOfficesList() {
    return ApiService.get(`/offices_list/`).then(response => response.data)
  }

  static fetchPermissionsList() {
    return ApiService.get(`/permissions_list/`).then(response => response.data)
  }

  static fetchRolesList() {
    return ApiService.get(`/roles_list/`).then(response => response.data)
  }

  static resendRegistrationEmail(id) {
    return ApiService.get(`/resend_registration_email?id=${encodeURIComponent(id)}`).then(response => response.data)
  }

  static addUser(newUser) {
    return ApiService.post('/add_user', newUser)
      .then(response => response.data.location)
      .catch(error => {
        if (error.response) {
          throw error.response.data
        }
      })
  }
}

export default UserService
