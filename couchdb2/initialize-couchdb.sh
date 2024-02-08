#!/bin/bash -e

echo "🔮 Setting up CouchDB 2..."

export OPENMCT_DATABASE_NAME=openmct-cm
export COUCH_ADMIN_USER=admin
export COUCH_ADMIN_PASSWORD=password
export COUCHDB_PORT=5985
export COUCH_BASE_LOCAL=http://localhost:${COUCHDB_PORT}
export COUCH_NODE_NAME=nonode@nohost

cat >/opt/couchdb/etc/local.ini <<EOF
[couchdb]
single_node=true

[admins]
${COUCH_ADMIN_USER} = ${COUCH_ADMIN_PASSWORD}

[chttpd]
port = ${COUCHDB_PORT}
EOF

echo "🔮 Starting CouchDB 2 daemon..."
nohup bash -c "/docker-entrypoint.sh /opt/couchdb/bin/couchdb &"
echo "🔮 Started CouchDB 2 daemon..."

for i in $(seq 15); do
  if curl -s http://localhost:${COUCHDB_PORT} >/dev/null 2>&1; then
    echo "🎉 CouchDB 2 is up 🎉"
    break
  fi
  echo "🔁 Waiting on CouchDB 2..."
  sleep 1
done

/couchdb_setup/setup-couchdb.sh