# In pull Docker instance.
FROM mongo

#ENV http_proxy 172.17.0.2:8099 - add proxy host:port

#create db-schema

# Let Docker know about the port that serve runs on 5015.
EXPOSE 5015

# Run serve when the image is run.
CMD ["--port 27017", "--smallfiles"]

# Set default container command
ENTRYPOINT usr/bin/mongod