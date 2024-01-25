FROM node:18
WORKDIR /openmct
RUN git clone https://github.com/akhenry/openmct-yamcs.git
RUN cd openmct-yamcs && \
    npm install && \
    npm install nasa/openmct#master --no-save && \
    npm run build:dist
COPY index.html site/index.html
COPY openmct-quickstart.js site/openmct-quickstart.js
RUN mkdir -p site/node_modules/openmct/dist
RUN cp -r openmct-yamcs/node_modules/openmct/dist/* site/node_modules/openmct/dist/
RUN cp -r openmct-yamcs/dist/openmct-yamcs.js site/
RUN cp -r openmct-yamcs/dist/openmct-yamcs.js.map site/
