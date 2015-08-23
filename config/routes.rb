Rails.application.routes.draw do
  root to: 'root#root'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :groups
    resources :events
    resources :comments
    resources :event_members
    resources :group_members
    resources :ratings
    resources :images

    # get '/users/current', to: 'users#current', as: 'users_current'
    resources :users, only: [:index, :show, :update]
  end

end
