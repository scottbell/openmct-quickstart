FROM httpd:2.4-alpine
RUN rm /usr/local/apache2/htdocs/index.html
COPY httpd.conf /usr/local/apache2/conf/httpd.conf
RUN mkdir -p /usr/local/apache2/conf/sites/
COPY openmct.conf /usr/local/apache2/conf/sites/openmct.conf
COPY .htpasswd /usr/local/apache2/conf/.htpasswd