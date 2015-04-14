require 'dotenv'
Dotenv.load

# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'support'
set :repo_url, 'git@github.com:hokolinks/hoko-docs.git'
set :deploy_to, ENV['DEPLOY_TO']

namespace :deploy do
  after :finishing, :update_jekyll do
    puts 'Removing old files'
    on ENV['DEPLOY_SSH'] do
      execute 'cd current && rm -rf _site/*'

      puts 'Building site'
      execute 'cd current && jekyll build'
    end
  end
end
