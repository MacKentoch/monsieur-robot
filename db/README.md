# Postgresql database initialization

## Install postgresql

### macOS

*A nice detailed article on [exponential.io](http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/)*

But in a summary follow these following steps

#### Install Postgre via `brew`

```bash
brew update

brew install postgres
```

#### Manual start postgresql

```bash
postgres -D /usr/local/var/postgres
```

#### Optionnal but recommended: install AdminPack for pgAdmin

```bash
psql postgres -c 'CREATE EXTENSION "adminpack";'
```

Download (*.dmg + .sig files*) -> check dmg signature via `gpg` -> install `pgAdmin`.

### Create a postgres role via pgAdmin

> Postgres should still be running (previous `postgres -D /usr/local/var/postgres` command) connect to server `127.0.0.1`.
