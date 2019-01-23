FROM timbru31/java-node

# Creating folder, defining workdir and mounting directory
RUN mkdir /code
WORKDIR /code

# Running tests against browserStack
ENTRYPOINT ./run-end-to-end-tests-ci.sh