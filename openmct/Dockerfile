FROM node:18
WORKDIR /openmct
COPY replace-localstorage-with-couchdb-indexhtml.sh .
RUN git clone https://github.com/akhenry/openmct-yamcs.git
RUN cd openmct-yamcs/example && ../../replace-localstorage-with-couchdb-indexhtml.sh
RUN cd openmct-yamcs && npm install
RUN cd openmct-yamcs && npm install nasa/openmct#master --no-save