Rails.application.routes.draw do
  resources :groups
  resources :users
  resources :posts
  resources :responses
  resources :comments
  resources :supporters
  mount_ember_app :frontend, to: "/"
end
