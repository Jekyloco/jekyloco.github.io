
---
title: 'Zpass'
description: 'Zpass'
pubDate: 'Jun 01 2024'
heroImage: '../../images/image_260429_01.png'
tags:
  - mdx
  - markdown
  - example
lang: English
---
# Zpass相关

> 启动业务进程前，先重新拉起zpass的进程，zk zmq redis

## zookeeper集群

```sh
cd /ztesoft/r90/zk/zookeeper-3.8.2/bin
./zkServer.sh start
./zkServer.sh status
#检查Mode状态
```

## zmq集群业务进程

> 拉起 zmq 集群前 先启动 zk集群
> 先启namesrv 再启broker

```sh
cd /ztesoft/r90/zmq/namesrv/zmq/bin
./mqnamesrv
./mqshutdown namesrv
./mqadmin brokerlist -n localhost:27001
./mqadmin clusterlist -n localhost:27001
cd /ztesoft/r90/zmq/broker/zmq/bin
./mqHAbroker
./mqshutdown broker
```

## zcache集群

DR三台zcache主机为例

```sh
#清理data重建目录
cd /ztesoft/r90/zcache/data
mkdir 28001 28002 28003 28004 28005 28006 28007 28008 28009 28010  28011 28012
#每台主机启动12个redis server
/ztesoft/r90/zcache/redis/bin/redis-server /ztesoft/r90/zcache/conf/redis-28001.conf
#一台主机上拉起client cluster
/ztesoft/r90/zcache/redis/bin/redis-cli --cluster create 10.18.139.100:28001 10.18.139.100:28002 10.18.139.100:28003 10.18.139.100:28004 10.18.139.100:28005 10.18.139.100:28006 10.18.139.100:28007 10.18.139.100:28008 10.18.139.100:28009 10.18.139.100:28010 10.18.139.100:28011 10.18.139.100:28012  10.18.139.101:28001 10.18.139.101:28002 10.18.139.101:28003 10.18.139.101:28004 10.18.139.101:28005 10.18.139.101:28006 10.18.139.101:28007 10.18.139.101:28008 10.18.139.101:28009 10.18.139.101:28010 10.18.139.101:28011 10.18.139.101:28012 10.18.139.102:28001 10.18.139.102:28002 10.18.139.102:28003 10.18.139.102:28004 10.18.139.102:28005 10.18.139.102:28006 10.18.139.102:28007 10.18.139.102:28008 10.18.139.102:28009 10.18.139.102:28010 10.18.139.102:28011 10.18.139.102:28012 --cluster-replicas 1 -a Zsmart0102
#检查节点状态
    /ztesoft/r90/zcache/redis/bin/redis-cli -p 28001 -a Zsmart0102 cluster nodes
#shutdown进程
/ztesoft/r90/zcache/redis/bin/redis-cli -p 28001 -a Zsmart0102 shutdown
```

## nginx启动

```shell
#root 用户启动
cd /usr/local/nginx/sbin
./nginx -c /usr/local/nginx/conf/nginx.conf
#重启：./nginx -s reload   
```
