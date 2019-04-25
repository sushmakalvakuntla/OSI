Rails.application.routes.draw do
  root 'dashboard#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: 'json' } do
    resources :search_user_list, only: [:index] do
    end
    get 'users_list_count', to:  'search_user_list#users_list_count'
    get 'verify_user', to: 'verify_user#index'

    resources :user_detail, only: [:show] do
      member do
        patch :save_user
        delete :remove_user_lock
      end
    end

    resources :resend_registration_email, only: [:index] do
    end

    resources :audit_events, only: [:index] do
    end

    get 'account', to: 'account#index'
    get 'permissions_list', to: 'permissions_list#index'
    get 'offices_list', to: 'offices_list#index'
    get 'roles_list', to: 'roles_list#index'
    post 'add_user', to: 'add_user#index'
  end

  get 'logout', to: 'cap_base#logout'

  # Single Page App home
  get '*path', to: 'dashboard#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
