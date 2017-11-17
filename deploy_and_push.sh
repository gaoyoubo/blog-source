#!/bin/zsh
hexo generate
git add -A
git commit -m .
git push
hexo deploy
