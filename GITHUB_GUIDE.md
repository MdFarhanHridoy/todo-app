# GitHub Workflow Guide

A quick reference for committing and pushing changes to this repository.

---

## Daily Workflow

### 1. Check what changed

```bash
git status
```

### 2. Stage your changes

Stage all changes at once:

```bash
git add .
```

Or stage specific files:

```bash
git add backend/src/app.module.ts frontend/src/app/page.tsx
```

### 3. Commit with a message

```bash
git commit -m "your commit message here"
```

**Good commit message examples:**
- `feat: add user authentication`
- `fix: resolve login redirect issue`
- `style: format frontend components`
- `refactor: clean up prisma service`
- `chore: update dependencies`

### 4. Push to GitHub

```bash
git push
```

---

## One-liner (stage + commit + push)

```bash
git add . ; git commit -m "feat: your message" ; git push
```

---

## Common Scenarios

### Pull latest changes before working

```bash
git pull
```

### Undo unstaged changes (discard local edits)

```bash
git checkout -- <filename>
```

### Undo last commit (keep changes staged)

```bash
git reset --soft HEAD~1
```

### Undo last commit (discard changes)

```bash
git reset --hard HEAD~1
```

### Fix last commit message

```bash
git commit --amend -m "corrected message"
```

### View commit history

```bash
git log --oneline
```

### Create a new branch and switch to it

```bash
git checkout -b feature/new-feature
```

### Merge a branch into main

```bash
git checkout main
git merge feature/new-feature
```

### Delete a branch after merging

```bash
git branch -d feature/new-feature
```

---

## Important Notes for Windows (PowerShell)

| Linux/Bash Command | PowerShell Equivalent |
|---|---|
| `rm -rf <dir>` | `Remove-Item -Recurse -Force <dir>` |
| `rm <file>` | `Remove-Item <file>` |
| `touch <file>` | `New-Item <file>` |
| `cat <file>` | `Get-Content <file>` |
| `cp -r <src> <dest>` | `Copy-Item -Recurse <src> <dest>` |
| `mv <src> <dest>` | `Move-Item <src> <dest>` |

> **Tip:** Git commands (`git add`, `git commit`, `git push`, etc.) work the same in both PowerShell and Bash.

---

## Files Ignored by Git

The following are excluded via `.gitignore` and will NOT be committed:

- `node_modules/` — installed dependencies
- `dist/`, `build/`, `.next/` — build output
- `.env`, `.env.local` — environment variables (contains secrets)
- `coverage/` — test coverage reports

> Never commit `.env` files or `node_modules/` to GitHub.