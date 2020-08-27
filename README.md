React Markdown
===

> React App and API to display Markdown


Available commands
---

to see a list of available commands run:
```bash
npm run help
```


Quick Start (local)
---

 1. run ``npm run init`` initiate project (installs all dependencies for all packages)
 
 2. run ``npm run markdown-api:serve`` to serve the API locally

    the Markdown API is now available on localhost port 7000
    
    you can test it with HTTPie as follows:
    
    ```bash
    http :7000/categories
    http :7000/contents
    http :7000/contents/1
    ```

 4. run ``npm run web-ui:start`` to serve Web UI locally

    the Web UI is now available on [localhost port 3000](http://localhost:3000)


Custom Markdown
---

To add your own navigation and markdown, simply populate the categories and contents tables.

The markdown field in the ``contents`` table can either reference Markdown:
 - by URL
 - or by filename (if the markdown file exists in ``packages/markdown-api-local/markdown``)
 
NOTE: the contents of ``packages/markdown-api-local/markdown`` is git ignored


Monorepo
---

> This is a monorepo that uses Lerna

so instead of running ``npm i`` in each package, run:
```
npm run bootstrap
```
in the project root, this will install all dependencies and also link local dependencies


Contributing
---

Before contributing please read through everything in [Contributing](docs/contributing.md)


Testing
---

```bash
npm run test
npm run test:watch
```


Additional Docs
---

 - [Prerequisites](docs/prerequisites.md)
 - [Contributing](docs/contributing.md)
 - [Node Version](docs/node-version.md)
