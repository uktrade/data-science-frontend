export LOG_LEVEL=debug 

`node_modules/.bin/nodemon src/app/cluster.js --ignore 'src/public/**/*' --ignore 'src/test/**/*' > app.log 2>&1` &

echo "App started"

`sleep 5`

echo "Running tests"

cd uiTest

npm run test

if [ $? -eq 0 ]
then
  echo "Tests executed successfully!"
  exit 0
else
  echo "Tests failed." >&2
  exit 1
fi
