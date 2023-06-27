FROM couchdb:latest
EXPOSE 5984
WORkDIR /couchdb_setup
COPY ./initialize-couchdb.sh /couchdb_setup/initialize-couchdb.sh
ADD https://raw.githubusercontent.com/nasa/openmct/master/src/plugins/persistence/couch/setup-couchdb.sh /couchdb_setup/setup-couchdb.sh
RUN chmod +x /couchdb_setup/initialize-couchdb.sh /couchdb_setup/setup-couchdb.sh
RUN /couchdb_setup/initialize-couchdb.sh