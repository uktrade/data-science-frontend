export LOG_LEVEL=debug 

echo "Building the assets"

npm run prod

echo "Starting app"

`node_modules/.bin/nodemon src/app/cluster.js --ignore 'src/public/**/*' --ignore 'src/test/**/*' > app.log 2>&1` &

`sleep 5`

echo "App started"

echo "Running tests"

npm run test:e2e
