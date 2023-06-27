#!/bin/bash -e

sed -i'.bak' -e 's/LocalStorage()/CouchDB("http:\/\/localhost:8000\/couchdb\/openmct")/g' index.js