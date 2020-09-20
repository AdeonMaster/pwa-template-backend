## Installation
- Clone repo to your working directory
- Install required packages with `npm i`
- Build app with `npm run build`, `npm run build:dev` or `npm run build:watch`
- Run app locally with `npm run start`
- Install `ca.ssl.indexnl.com.crt` certificate inside `server/cert` folder in order to use SSL on your localhost (See the [detailed installation guide for Windows users](#ssl-certificate-installation-detailed-guide-for-windows))

## SSL certificate installation detailed guide for Windows
- Navigate to `server/cert` folder inside app working directory
- Double click on `ca.ssl.indexnl.com.crt` certificate file
- Press `Install Certificate` button
- Select certificate store location and press `Next` (can be skipped by default)
- Select `Place all certificates in the following store` and press `Browse` button
- In the opened window select `Trusted Root Certification Authorities` and press `Ok`
- Make sure `Trusted Root Certification Authorities` appeared in certificate store input field and press `Next`
- In the newly opened window press `Finish` button
- After successful installation close all browser instances in order new settings to take effect 

## Commands (Scripts)
| Command | Description |
| --- | --- |
| `build:watch` | run dev build in watch mode |
| `build:dev` | run dev build |
| `build` | run build |
| `dev-server` | run server in dev mode |
| `dev-api` | run api in dev mode |
| `server` | run server in prod mode |
| `api` | run api in prod mode |
| `eslint` | run eslint |
| `eslint:fix` | run eslint with fix |
| `jest` | run jest |
| `jest:coverage` | get total test coverage |
| `killall` | kill all node.js processes |
| `swagger-build` | Build swagger definitions |

## Swagger
To see the list of documented endpoints run `npm run swagger-build` then `npm run build:dev` then `npm run dev-server` and navigate to `/swagger`

## Redux based socket communication mechanism
To send a socket message, client should dispatch an Redux action with type like **'socket/emitMessage/*'** where **\*** wildcard is a message name. Example:
```javascript
dispatch({
  type: 'socket/emitMessage/SocketExampleMessage',
  payload: {
    message: 'Hello world!'
  }
});
```

When a server is sending a socket message it will be dispatched as an Redux action with type like **'socket/message/*'** where **\*** wildcard is a message name. Note: To catch such messages it's type should be included in **LISTENED_SOCKET_ACTIONS** inside constants file.

## Issues
- express/logger-middleware - response.on('end', () => {}) isn't called. Possibly broke on http2 commit
- Environment: spdy is not supporting Node.js versions greater than 10.18.1
