export const getAdminOfficeIDs = account => {
  const roles = ['Super-admin', 'State-admin', 'County-admin']

  if (account && account.admin_office_ids && !isRolesAvailable(account, roles) && account.roles.includes('Office-admin')) {
    return account.admin_office_ids
  } else return []
}

export const isRolesAvailable = (userAccount, roles) => {
  return userAccount.roles.some(r => roles.includes(r))
}
