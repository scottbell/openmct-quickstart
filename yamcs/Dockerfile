FROM maven:3.6-openjdk-11
WORkDIR /yamcs
RUN git clone https://github.com/yamcs/quickstart.git
RUN cd quickstart && mvn compile
CMD cd quickstart && python3 simulate.py &
CMD cd quickstart && mvn yamcs:run