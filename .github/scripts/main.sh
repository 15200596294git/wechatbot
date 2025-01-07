#!/bin/sh

project_dir="/var/www/wechatbot"
project_name="backend"
service_name="wechatbot-backend"

cd "$project_dir/$project_name"
git pull

cd "$project_dir"
docker-compose build "$service_name"
docker-compose up -d "$service_name"