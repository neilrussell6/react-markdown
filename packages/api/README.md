React Markdown REST API
===

> REST API package for React Markdown


Commands
---

to see all available commands run:
```
npm run help
```


Migrations
---

### run local migrations

```
npm run migrate up
```

### run remote migrations

```
npm run migrate:<stage> up
```


Tests
---

### run unit tests

```
npm run test
```
or
```
npm run test:watch
```

### run internal integration tests

start test docker container (including test database)
```
npm run test:start
```

run migrations on test database
```
npm run migrate:test up
```

run internal integration tests
```
npm run test:ii
```
or
```
npm run test:ii:watch
```
