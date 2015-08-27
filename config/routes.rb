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
    resources :users, only: [:index, :show, :update]
  end

  # dumping production psql heroku db to seed in development
  get 'dumps/users', :to => 'dumps#users'
  get 'dumps/comments', :to => 'dumps#comments'
  get 'dumps/event_members', :to => 'dumps#event_members'
  get 'dumps/events', :to => 'dumps#events'
  get 'dumps/group_members', :to => 'dumps#group_members'
  get 'dumps/groups', :to => 'dumps#groups'
  get 'dumps/images', :to => 'dumps#images'
  get 'dumps/ratings', :to => 'dumps#ratings'
end
