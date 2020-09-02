#!/bin/bash

FILE=.env
if [ -f "$FILE" ]; then
    source $FILE
fi

ENVIRONMENT=development
SEQUELIZECLI="yarn sequelize"

for DATABASE in $(echo "postgres,sqlserver" | tr "," "\n"); do
  $SEQUELIZECLI init \
    --env $ENVIRONMENT \
    --config $NODE_PATH/config/database/$DATABASE.js \
    --models-path $NODE_PATH/models/$DATABASE \
    --migrations-path $NODE_PATH/database/migrations/$DATABASE \
    --seeders-path $NODE_PATH/database/seeders/$DATABASE \
    --force && \
  cp scripts/database/$DATABASE.js $NODE_PATH/config/database/$DATABASE.js && \
  $SEQUELIZECLI db:create \
    --env $ENVIRONMENT \
    --config $NODE_PATH/config/database/$DATABASE.js \
    --models-path $NODE_PATH/models/$DATABASE \
    --migrations-path $NODE_PATH/database/migrations/$DATABASE \
    --seeders-path $NODE_PATH/database/seeders/$DATABASE
done
