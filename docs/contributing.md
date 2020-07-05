Contributing
===

Pull Requests & Merging
---

 1. Branch your feature branch from develop
 2. Once your work is done, create a Pull Request onto develop
 3. Request a review
 4. Once approved, squash merge into the target branch


GIT Commit Messages
---

We are using [semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages).

Additionally we will include the context (package name) when only changes were made to it eg.
```
"feat(markdown-api): return list of active users"
```
```
"style(web-ui): change all blue colors to red"
```
```
"refactor(markdown-api): make something more efficient"
```

> NOTE: chore refers to infrastructure, CI, scripts etc, so will never relate to a feature module, so you should never do ``"chore(some-module): some chore"``
