FROM gbhrdt/meteord:base
MAINTAINER Reactive Code GmbH

RUN \
  echo "deb http://ftp.ch.debian.org/debian sid main" >> /etc/apt/sources.list

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y ffmpeg graphicsmagick \
 && rm -rf /var/lib/apt/lists/*

COPY ./ /app
RUN bash $METEORD_DIR/on_build.sh
