# Monsieur Robot

## Prerequisites

- NodeJS 8.x
> Please don't miss this requirement. This is important!

## Detailed Content

<details>
  <summary>Front</summary>

  - Next js (4.x+ [github :link:](https://github.com/zeit/next.js))
  - React JS (16.x+ - [github :link:](https://github.com/facebook/react))
  - redux (*as your application grows managing state will be a serious concern, save pain with Redux*)
  - redux-persist (*simplifies your NextJS state share between pages* [github :link:](https://github.com/rt2zz/redux-persist))
  - localForage
  - react-redux (*Redux is not specific to ReactJS, you could easily use it with Angular2 for instance*)
  - redux-thunk (*simple and does the job*)
  - next-redux-wrapper
  - redux-devtools-extension ([github :link:](https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension))
  - material UI 1.x beta ([github :link:](https://github.com/callemall/material-ui/tree/v1-beta))
  - axios ([github :link:](https://github.com/mzabriskie/axios) *Why: simple, complete, isomorphic ...*)

</details>


<details>

  <summary>Tool chain</summary>
  - Next js (4.x+ [github :link:](https://github.com/zeit/next.js))
  - Flow JS types

</details>

<details>

  <summary>fav icon</summary>

  - favicons generated by [realfavicongenerator](https://realfavicongenerator.net/)

</details>

## Howto

### Database


#### Install Postgresql

Follow [database creation README](./db/README.md)

#### Create database

```bash
npm run db:create
```

*if it already exists and you want to reset it, drop database:*

```bash
npm run db:drop
```


#### Load initial data

```bash
npm run db:load
```


#### Run database server

```bash
npm run db:start
```

### Application (website)

#### Clone this repository

  ```bash
  git clone https://github.com/MacKentoch/monsieur-robot.git
  ```

#### Install dependencies

```bash
npm install
```

#### dev server (for dev only - with hot-reload - do not use in production)

```bash
npm run dev
```

NOTE: ensure db server is already running (`npm run db:start`)

#### build bundle (for production)

  ```bash
  npm run build
  ```

#### start server (for production)

*NOTE:* ensure you built first before starting.

  ```bash
  npm run start
  ```

  NOTE: ensure db server is already running (`npm run db:start`)
