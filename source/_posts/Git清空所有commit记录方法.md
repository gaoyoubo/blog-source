---
title: Git清空所有commit记录方法
tags:
  - git
categories:
  - 程序员
toc: false
date: 2019-04-25 19:39:23
---

说明：例如将代码提交到git仓库，将一些敏感信息提交，所以需要删除提交记录以彻底清除提交信息，以得到一个干净的仓库且代码不变

1. Checkout
```shell
git checkout –orphan latest_branch
```

2. Add all the files
```shell
git add -A
```

3. Commit the changes
```shell
git commit -am "commit message"
```

4. Delete the branch
```shell
git branch -D master
```

5. Rename the current branch to master
```shell
git branch -m master
```

6. Finally, force update your repository
```shell
git push -f origin master
```