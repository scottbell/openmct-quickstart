FROM maven:3.6-openjdk-11
WORkDIR /yamcs
RUN git clone https://github.com/yamcs/quickstart.git
RUN cd quickstart && mvn compile
RUN cd quickstart/src/main/yamcs/etc/ && sed -i '/args:/a \      contextPath: "/yamcs"' yamcs.yaml 
CMD cd quickstart && mvn yamcs:run