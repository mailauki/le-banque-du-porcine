Rails.application.routes.draw do
  resources :lists
  resources :wallets
  resources :balances
  resources :items
  resources :goals
  resources :progresses
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  get "/:username", to: "users#show"

  post "/login", to: "session#create"
  delete "/logout", to: "session#destroy"

  get "/:id/balances", to: "balances#index"
  post "/:id/balances", to: "balances#create"

  get "/:id/items", to: "items#index"
  post "/:id/items", to: "items#create"
  
  # get "/:id/goals", to: "goals#index"
  # post "/:id/goals", to: "goals#create"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
