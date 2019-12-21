# QrEncripter (and Decripter)

Small util to store information encripted in QrCode (and decripte information from QrCode)

### Run :
Install all dependencies 

    npm install

Run app

    yarn start

### Docker :

Build container:

    docker build --rm -t qrencripter:latest .

Run container

    docker run --rm  -p 3000:3000 --name qrencripter qrencripter:latest

For run as demon add

    -d

Read logs from container

    docker logs qrencripter
