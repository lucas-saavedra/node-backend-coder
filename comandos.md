# Inicio con nodemon
```sh 
npm run startDev -- -p 8081 -m cluster
npm run startDev -- -p 8081 -m fork
```

# Listado de procesos
```sh
tasklist /fi "imagename eq node.exe"
tasklist /fi "imagename eq nginx.exe"
```
# Forever
```sh
 forever -w start src/index.js -p 8081 -m cluster
 forever -w start src/index.js -p 8081 -m fork
 forever list
```
# PM2
## Fork
pm2 start src/index.js --name="server1" --watch -- -p 2000 

## Cluster
pm2 start src/index.js --name="server1" --watch -i max -- -p 2000 
pm2 list

# Nginx
```sh
node src/index.js -p 8080
node src/index.js -m cluster -p 8081
```
## Nginx Config
```sh
events {} 
http {
    include mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server  127.0.0.1:8080;
    }
    upstream random {
        server 127.0.0.1:8081;
    }
    server {
        listen       80;
        server_name  nginx_server;
        location / {
         proxy_pass http://node_app;
        }
        location /api/randoms/ {
          proxy_pass http://random;
        }
    }
}
```

> Nota: Cluster desde Nginx

```sh
node src/index.js -p 8080
node src/index.js -p 8082
node src/index.js -p 8083
node src/index.js -p 8084
node src/index.js -p 8085
```

```sh
events {}
http {
    include mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server  127.0.0.1:8080;
    }
    upstream random {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }
    server {
        listen       80;
        server_name  nginx_server;
        location / {
         proxy_pass http://node_app;
        }
        location /api/randoms/ {
          proxy_pass http://random;
        }
    }
}
```