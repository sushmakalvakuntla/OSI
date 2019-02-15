import React from 'react'
import { shallow } from 'enzyme'
import { Link, MemoryRouter } from 'react-router-dom'
import { Link as LinkRWD } from 'react-wood-duck'
import UserDetail from './UserDetail'
import PageHeaderButtons from './DetailsPageHeaderButtons'

describe('UserDetail', () => {
  let container
  let wrapper
  let instance
  let mockFetchDetailsActions
  let mockSaveUserDetailsActions
  let mockFetchPermissionsActions
  let mockFetchRolesActions
  let mockClearDetailsActions
  let mockResendRegistrationEmailActions
  let mockClearAddedUserDetailActions
  let mockHandleDropDownChangeAction
  let mockClearSaveAlertAction
  let mockHandleInputChangeAction
  let mockFetchChangeLogAdminDetailsAction

  beforeEach(() => {
    // Register mock dispatchActions
    mockFetchDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSaveUserDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockClearDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockClearAddedUserDetailActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockResendRegistrationEmailActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockFetchPermissionsActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockFetchRolesActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockFetchChangeLogAdminDetailsAction = jest.fn()
    mockHandleDropDownChangeAction = jest.fn()
    mockClearSaveAlertAction = jest.fn()
    mockHandleInputChangeAction = jest.fn()
    const initialDetails = { id: '12345' }
    const match = { params: { id: '12345' } }
    const details = { id: '12345', email: '' }
    const XHRStatus = 'ready'
    container = shallow(
      <MemoryRouter>
        <UserDetail
          userEditOption={{ editable: true }}
          details={details}
          initialDetails={initialDetails}
          XHRStatus={XHRStatus}
          dashboardUrl="dburl"
          userListUrl="myUserList"
          isRolesDisabled={true}
          actions={{
            fetchDetailsActions: mockFetchDetailsActions,
            fetchPermissionsActions: mockFetchPermissionsActions,
            fetchRolesActions: mockFetchRolesActions,
            clearDetails: mockClearDetailsActions,
            saveUserDetailsActions: mockSaveUserDetailsActions,
            handleDropdownChangeAction: mockHandleDropDownChangeAction,
            resendRegistrationEmailActions: mockResendRegistrationEmailActions,
            clearAddedUserDetailActions: mockClearAddedUserDetailActions,
            clearSaveAlert: mockClearSaveAlertAction,
            handleInputChangeAction: mockHandleInputChangeAction,
            fetchChangeLogAdminDetailsActions: mockFetchChangeLogAdminDetailsAction,
          }}
          match={match}
        />
      </MemoryRouter>
    )
    wrapper = container.find('UserDetail').dive()
    instance = wrapper.instance()
  })

  describe('statics', () => {
    describe('defaultProps', () => {
      it('default props', () => {
        expect(UserDetail.defaultProps.dashboardUrl).toEqual('/')
        expect(UserDetail.defaultProps.dashboardClickHandler).not.toThrow()
      })
    })
  })

  describe('Setting state', () => {
    describe('#handleDropDownChange() function', () => {
      it('should set the Status state when event is triggered', () => {
        const myFunction = wrapper.instance().handleDropDownChange
        expect(() => myFunction('enabled', true)).not.toThrow()
      })

      it('will set the details state with updated roles when event is triggered ', () => {
        const myFunc = wrapper.instance().handleDropDownChange
        expect(() => myFunc('roles', ['role2'])).not.toThrow()
      })

      it('should set the Permissions state when event is triggered', () => {
        const myFunction = wrapper.instance().handleDropDownChange
        expect(() => myFunction('permissions', ['Hotline-rollout'])).not.toThrow()
      })
    })

    describe('#onInputChange', () => {
      it('should set the email state when event is triggered', () => {
        const instance = wrapper.instance()
        const myFunction = instance.handleInputChange
        expect(() => myFunction('Hello@gmail.com')).not.toThrow()
      })
    })

    describe('#getChangeLogAdminDetails', () => {
      it('should fetch changeLog admin details when event is triggered', () => {
        const myFunction = wrapper.instance().getChangeLogAdminDetails
        expect(() => myFunction('someid')).not.toThrow()
      })
    })

    describe('#showAddAlert', () => {
      it('verifies UserMessage component to display the alert', () => {
        wrapper.setProps({ id: '123456' })
        const instance = wrapper.instance()
        instance.showAddAlert()
        expect(wrapper.find('UserMessage').length).toEqual(1)
      })
    })
  })

  describe('#emailSent()', () => {
    it('displays <UserMessage/>', () => {
      wrapper.setState({ resendEmailAlert: true })
      expect(wrapper.find('UserMessage').length).toBe(1)
      expect(wrapper.find('UserMessage').props().successMsg).toBe('Registration email has been sent successfully')
    })
  })

  describe('#onResendInvite', () => {
    it('calls the service to resendRegistrationEmail', () => {
      wrapper.instance().onResendInvite()
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('12345')
      expect(wrapper.instance().state.resendEmailAlert).toEqual(true)
      expect(mockClearSaveAlertAction).toHaveBeenCalledWith()
    })
  })

  describe('#pageButton', () => {
    it('renders the buttons ', () => {
      const onReset = wrapper.instance().onReset
      const onSaveDetails = wrapper.instance().onSaveDetails
      wrapper.setProps({ isUserEditable: true, disableActionBtn: true, isPermissionsEmpty: true })
      expect(wrapper.instance().pageButton()).toEqual(
        <PageHeaderButtons
          onReset={onReset}
          onSaveDetails={onSaveDetails}
          isUserEditable={true}
          disableButtons={true}
          isPermissionsEmpty={true}
        />
      )
    })
  })

  describe('#onReset', () => {
    it('calls the appropriate function', () => {
      instance.onReset()
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('12345')
    })
  })

  describe('#componentDidMount', () => {
    it('fetches details', () => {
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('12345')
    })

    it('fetches the permissions', () => {
      expect(mockFetchPermissionsActions).toHaveBeenCalledWith()
    })

    it('fetches the roles', () => {
      expect(mockFetchRolesActions).toHaveBeenCalledWith()
    })
  })

  describe('#componentWillUnmount', () => {
    it('componentWillUnmount should be called on unmount', () => {
      const componentWillUnmount = jest.spyOn(instance, 'componentWillUnmount')
      wrapper.unmount()
      expect(componentWillUnmount).toHaveBeenCalledWith()
    })
  })

  describe('#onSaveDetails', () => {
    it('calls the service to patch the user record', () => {
      wrapper.setProps({ updatedDetails: { email: 'test@gmail.com' } })
      instance.onSaveDetails()
      expect(mockSaveUserDetailsActions).toHaveBeenCalledWith('12345', { email: 'test@gmail.com' })
      expect(mockClearAddedUserDetailActions).toHaveBeenCalledWith()
    })
  })

  describe('renders components', () => {
    it('renders component "PageHeader"', () => {
      expect(wrapper.find('PageHeader').length).toBe(1)
    })

    it('renders navigation link to Dashboard', () => {
      expect(
        wrapper
          .find('Link')
          .at(0)
          .html()
      ).toContain('Dashboard')
    })

    describe('renders cards', () => {
      it('renders the <UserDetailShow/> when user is not editable', () => {
        wrapper.setProps({ isUserEditable: false })
        expect(wrapper.find('UserDetailEdit').length).toBe(0)
        expect(wrapper.find('UserDetailShow').length).toBe(1)
      })

      it('renders the <UserDetailEdit/> when user is editable', () => {
        wrapper.setProps({ isUserEditable: true })
        expect(wrapper.find('UserDetailShow').length).toBe(0)
        expect(wrapper.find('UserDetailEdit').length).toBe(1)
      })

      it('should contain <UserMessage/> to display the alert', () => {
        wrapper.setProps({ fetchDetailsError: 'Unauthorized' })
        expect(wrapper.find('UserMessage').length).toBe(1)
      })

      it('should display <ChangeLog/> ', () => {
        expect(wrapper.find('ChangeLog').length).toBe(1)
      })

      it('should display  <Notes/>', () => {
        expect(wrapper.find('Notes').length).toBe(1)
      })

      it('should display  <CWSPrivileges/>', () => {
        expect(wrapper.find('CWSPrivileges').length).toBe(1)
      })

      it('renders card with text indicating no user found', () => {
        wrapper.setProps({ XHRStatus: 'ready', details: {} })
        expect(wrapper.find('Cards').length).toBe(1)
        expect(wrapper.find('Cards').props().cardHeaderText).toBe('User not found')
      })

      it('renders card with text indicating loading', () => {
        wrapper.setProps({ XHRStatus: 'anything but ready' })
        const cards = wrapper.find('Cards')
        expect(cards.length).toBe(1)
        expect(cards.children().text()).toContain('Loading...')
      })
    })

    describe('breadcrumb', () => {
      it('has a link to User List', () => {
        const link = wrapper.find(Link).at(0)
        expect(link.children().text()).toContain('User List')
        expect(link.prop('to')).toEqual('/')
      })

      it('has a link to the CARES dashboard', () => {
        const link = wrapper.find(LinkRWD).at(0)
        expect(link.prop('href')).toEqual('dburl')
      })
    })
  })

  describe('#showAlert()', () => {
    it('displays error <UserMessage/>', () => {
      const props = { user_message: 'Cognito user validation is failed' }
      wrapper.setProps({ displayAlert: true, userDetailError: props })
      const alertBox = wrapper.find('UserMessage')
      expect(alertBox.length).toBe(1)
      expect(alertBox.props().errorMsg).toEqual(props)
    })

    it('displays success <UserMessage/>', () => {
      wrapper.setProps({
        userDetailError: null,
        displayAlert: true,
        saveSuccessMsg: 'Your changes have been made successfully',
      })
      const alertBox = wrapper.find('UserMessage')
      expect(alertBox.length).toBe(1)
      expect(alertBox.props().successMsg).toEqual('Your changes have been made successfully')
    })

    it('when email is edited, displays different success <UserMessage/>', () => {
      wrapper.setProps({
        userDetailError: null,
        displayAlert: true,
        saveSuccessMsg: 'Your changes have been made successfully. A Registration invite will be sent to the new email.',
      })
      const alertBox = wrapper.find('UserMessage')
      expect(alertBox.length).toBe(1)
      expect(alertBox.props().successMsg).toEqual(
        'Your changes have been made successfully. A Registration invite will be sent to the new email.'
      )
    })

    it('does not display <UserMessage/>', () => {
      wrapper.setProps({ userDetailError: null, displayAlert: false })
      const alertBox = wrapper.find('UserMessage')
      expect(alertBox.length).toBe(0)
    })
  })
})
