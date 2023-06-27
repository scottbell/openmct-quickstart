#!/bin/bash -e

echo "🔮 Setting up CouchDB..."

export OPENMCT_DATABASE_NAME=openmct
export COUCH_ADMIN_USER=admin
export COUCH_ADMIN_PASSWORD=password
export COUCH_BASE_LOCAL=http://localhost:5984
export COUCH_NODE_NAME=nonode@nohost

cat >/opt/couchdb/etc/local.ini <<EOF
[couchdb]
single_node=true

[admins]
${COUCH_ADMIN_USER} = ${COUCH_ADMIN_PASSWORD}
EOF

echo "🔮 Starting CouchDB daemon..."
nohup bash -c "/docker-entrypoint.sh /opt/couchdb/bin/couchdb &"
echo "🔮 Started CouchDB daemon..."

for i in $(seq 15); do
  if curl -s http://localhost:5984 >/dev/null 2>&1; then
    echo "🎉 CouchDB is up 🎉"
    break
  fi
  echo "🔁 Waiting on CouchDB..."
  sleep 1
done

/couchdb_setup/setup-couchdb.sh