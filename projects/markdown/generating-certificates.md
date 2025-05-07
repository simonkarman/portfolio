---
title: Generating Self Signed Certificates
date: '2020-01-22'
contributors: Simon Karman
description: A step by step explanation on how to generate your own self signed certificate for personal development purposes
tags:
  - certificates
  - https
  - javascript
  - security
image: https://images.ctfassets.net/r26fkm24j6bh/5m4pz1VzO9RCY6RDSGxpoB/c26b1db1861261115d65ef48e7e62c3e/https.png
---

# Generating Self Signed SSL Certificates
Nowadays almost all traffic between applications should use HTTPS. When developing a new application it can be a bit of a hassle to set this up, so sometimes it is skipped on the development environment and only applied on production environments, while I believe that even during the development of your own applications it is generally a good idea to build it using HTTPS. This not only makes your development environments more safe, it also saves you from weird bugs and discoveries that will have to be fixed once you see that the things you build work differently (or event don't work at all) when using HTTPS.

However, setting up HTTPS on your local machine can be cumbersome. I noticed that most information regarding HTTPS on the internet only partially explains how to properly setup HTTPS traffic on your local machine. What also doesn't help in this case is that those different online resources all seem to use their own terminology for the same things. That's why I though it would be nice share how I think you should setup HTTPS on your local machine for development perposes in this article (obligatory link to xkcd: [https://xkcd.com/927/](https://xkcd.com/927/)). I hope you like it.

## Webserver (example in Express)
A prerequisite of using HTTPS is the need of an SSL certificate. In the configuration of most webservers you have to point to two files, the first is the `key` which contains your private key and secondly a `crt` file which contains your certificate.

Below is an example of how to setup https for you express application in NodeJS (please reffer to the documentation of your own webserver or framework on how to enable https).
```javascript
const privateKey  = fs.readFileSync('certs/server.key', 'utf8');
const certificate = fs.readFileSync('certs/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);
```

## Getting Started
Please follow the steps below to generate a self signed certificate which can be used for local development. These example assume that the two certificate files should be called `server.key` and `server.crt` and should both end up in the `certs` directory. If you need them somewhere else, the easiest thing to do it to just follow the steps below and aftewards copy them your the destination of your choice.

In our example the server expects the private key (`certs/server.key`) and the certificate (`certs/server.crt`) to be located in the certs directory. Please make sure that this directory is included in your .gitignore file to ensure that your private key is not accidentally pushed to your repository for everyone to see.

Ensure the `certs` directory exists and otherwise create it using the following command:

```bash
$ mkdir certs
```

> Make sure you execute all following commands in this tutorial from this `certs` directory.

## Root certificate
First we need to generate a root Certificate Authority. This will be root certificate of your certificate chain. You can also use an existing one if you already have one, thats why we generate it in your home folder. You can reuse it for all your development projects. Keep this file secure because it is the private key. Execute the following to command to first create the private key of the root CA (.key) and then create the public key (.pem) of the root CA.

```bash
$ mkdir ~/.karman/
$ openssl genrsa -out ~/.karman/rootCA.key 2048
$ openssl req -x509 -new -nodes -key ~/.karman/rootCA.key -sha256 -days 3650 -out ~/.karman/rootCA.pem
```

> You can replace the occurence of `.karman` with something of your liking. This is just the directory name where your root certificate will be stored.

The pem file that was just generated should be added to your applications (for example `Google Chrome`). These applications will then trust all certificates that use it as their root certificate. This is another reason why it is usefull to use one root for all your applications. Only needing to add one certificate to each of your applications is easier.

## Configuration
Secondly we need to create two files. One is the config for the certificate request and the other one is the extension file including the subject alternative names (SAN) of your domain.

Create both files as described below and fill in the values for countryCode, stateName, cityName, organisation, organisationUnit, emailAddress, CN, and DNS.1. The CN and DNS.1 are very important since these tell the certificate on which subdomain and domain the certificates can be used. If you own the domain `example.org` and your server is running on the `app` subdomain, then you should use the `app.example.org` value for the CN and the same for the DNS.1 name.

```ini
# certs/server.csr.cnf
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=countryCode
ST=stateName
L=cityName
O=organisation
OU=organisationUnit
emailAddress=email@example.com
CN=app.example.com

# certs/v3.ext
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = app.example.com
```

## Generation
Now we can generate the private key: `server.key`. Using the command below and enter a pass phrase when requested.
```bash
$ openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )
```

Finally generate the self signed certificate: `server.crt`
```bash
$ openssl x509 -req -in server.csr -CA ~/.karman/rootCA.pem -CAkey ~/.karman/rootCA.key -CAcreateserial -out server.crt -days 3650 -sha256 -extfile v3.ext
```

That should be everything. Make sure that you can reach your application over the provided dns name (for example: `app.example.com`) and enjoy your HTTPS webserver!