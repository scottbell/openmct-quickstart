FROM couchdb:3.3.2
EXPOSE 5984
WORkDIR /couchdb_setup
COPY ./initialize-couchdb.sh /couchdb_setup/initialize-couchdb.sh
ADD https://raw.githubusercontent.com/nasa/openmct/master/src/plugins/persistence/couch/setup-couchdb.sh /couchdb_setup/setup-couchdb.sh
RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix /couchdb_setup/initialize-couchdb.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*
RUN chmod +x /couchdb_setup/initialize-couchdb.sh /couchdb_setup/setup-couchdb.sh
RUN /couchdb_setup/initialize-couchdb.sh