---
description: Stage all files, commit with message, push to remote, and optionally deploy to Vercel
---

Add all files, create a commit, push to the remote repository, and optionally deploy to Vercel.

## Usage

- `/ship` - Stage, commit, and push (no deployment)
- `/ship deploy` - Stage, commit, push, AND deploy to Vercel

## Steps

1. Run `git status` to see current changes
2. Run `git diff` to see staged and unstaged changes
3. Run `git log --oneline -5` to see recent commit style
4. Stage all files with `git add .`
5. Create a descriptive commit message following the repository's style
6. Commit with the message, including the Claude Code attribution footer
7. Push to remote with `git push`
8. If "deploy" argument was provided, run `vercel --prod --yes` to deploy

## Important Notes

- ALWAYS review git status and diff before committing
- Write clear, descriptive commit messages
- Include the standard footer:
  ```
  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```
- Only deploy to Vercel if explicitly requested with "deploy" argument
- Use heredoc syntax for multi-line commit messages
