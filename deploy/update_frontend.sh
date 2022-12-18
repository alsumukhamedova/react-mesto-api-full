#!/bin/bash

git pull origin main
npm run build
sudo cp -r ~/react-mesto-api-full/frontend/build/* /var/www/html/mesto/
echo "Success!"
