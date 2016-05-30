# Meteor Micro-Service Cluster

## Stack
- Nginx
- Nginx Auto VirtualHost/Upstream Configuration based on Docker container environment variables including DDOS hardened configuration template (https://www.nginx.com/blog/mitigating-ddos-attacks-with-nginx-and-nginx-plus/, https://hub.docker.com/r/jwilder/docker-gen/)
- Nginx Auto Letsencrypt/SSL Configuration based on Docker container environment variables (https://hub.docker.com/r/jrcs/letsencrypt-nginx-proxy-companion/)
- Logspout to forward logs to Papertrail/Loggly/ELK ... (https://hub.docker.com/r/gliderlabs/logspout/)
- Logrotate logs on containers preventing space loss because of logs (https://hub.docker.com/r/michaloo/logrotate/)
- Mongo 2.6 with ReplSet (https://hub.docker.com/r/ekesken/mongo/)

## App Containers
- Dockerfiles based on gbhrdt/meteord (https://hub.docker.com/r/gbhrdt/meteord/, 1.3.2.4+ compatible)
- Processor has Graphicsmagick and FFMPEG 3.0 added to the container
- Webapp is just a normal Meteor Application
- Both Meteor apps are cluster-enabled through meteorhacks:cluster

## Prerequisits
1. Docker Tools installed locally, you will only need the CLI Tools
2. Docker Machine XYZ & Env Set (docker-machine env XYZ)
3. Any domain and a DNS where you can setup A records.

## Steps
1. Get an instance and open ports: 443, 80.
2. Add an A entry in dns connecting your docker machine with a subdomain.
3. configure subdomain in ./docker-compose.yml, configure log-receiver url in ./nginx/docker-compose.yml
4. inside ./nginx: docker-compose up, check if ssl certificate has been requested successfully.
5. inside ./: docker-compose up clustertest-db, don't up the meteor apps yet.
6. Access mongodb and start replica: rs.initiate(), ready for connection.
7. inside ./: docker-compose up, this can take a long time.

## Other Things
- Get a docker machine in exoscale: https://docs.docker.com/machine/drivers/exoscale/
- Or ramp up a whole Swarm :) https://www.exoscale.ch/syslog/2016/03/16/private-networking-with-docker/
- MongoDB's 27017 gets published to the host machine. It's possible to connect to mongodb with mongohub therefore: look in ~/.docker/machine/machines/ to get the generated private key when you generate a docker machine through the cli.

## Scaling (useful in Swarm environment)
- Spawn auto-balanced processors and web instances like this: docker-compose scale web=2 processor=5, cool hm?
