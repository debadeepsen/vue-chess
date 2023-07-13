sudo rm -rf dist;
npm run build;
sudo rm -rf /var/www/html/vue-chess;
sudo cp -r dist /var/www/html/vue-chess
