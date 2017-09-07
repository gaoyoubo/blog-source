#!/bin/zsh
hexo generate
git add -A
git commit -m .
hexo deploy
