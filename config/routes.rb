Rails.application.routes.draw do
  get "signup", to: "users#new", as: "signup"
  get "login", to: "sessions#new", as: "login"
  get "logout", to: "sessions#destroy", as: "logout"
  get "new_chat", to: "chat#new_chat", as: "new_chat"

  resources :users
  resources :sessions
  resources :chat
  # Defines the root path route ("/")
  root "chat#index"
end
