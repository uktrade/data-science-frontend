export LOG_LEVEL=debug 

echo "Building the assets"

npm run prod

echo "Starting app"

`node_modules/.bin/nodemon src/app/cluster.js --ignore 'src/public/**/*' --ignore 'src/test/**/*' > app.log 2>&1` &

`sleep 5`

echo "App started"

cd uiTest/functional

echo "Running tests"

npm run test -- --browser chrome

if [ $? -eq 0 ]
then
  echo "Tests executed successfully!"
  exit 0
else
  echo "Tests failed." >&2
  exit 1
fi
