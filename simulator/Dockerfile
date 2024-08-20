FROM python:3.11
WORKDIR /simulator
RUN git clone https://github.com/yamcs/quickstart.git
RUN cd quickstart && sed -i "/tm_socket.sendto/s,'127.0.0.1','yamcs',g" simulator.py && \
    sed -i "s/sleep(1)/sleep(0.3)/g" simulator.py
CMD cd quickstart && python simulator.py