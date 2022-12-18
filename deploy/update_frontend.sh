#!/bin/bash

git pull origin main
sudo cp -r ~/react-mesto-api-full/frontend/build/* /var/www/html/mesto/
echo "Success!"
