---
layout: post
title: Git rebase
---

今天下午，花了小半天的时间看了下git文档的分支部分，目的是学习一下git rebase，
分支的操作其实有以下三种：


### 本地分支合并

监控当前文件：git add 文件名 (每次文件修改都要add一下，不然不会监控上)

查看分支：git log --oneline --decorate --graph --all

如果要查看哪些分支已经合并到当前分支，可以运行 git branch --merged

遗留问题：git branch -d test 删除test分支 其实还可以通过git checkout test回归，这是为啥？（如果出现：error: The branch 'testing' is not fully merged.，正如字面意思一样，需要合并下）（顺便：远程分支通过 git push origin --delete test 删除，这个时候不能通过checkout回归，这个时候如果要[恢复](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF#_%E6%8B%89%E5%8F%96)怎么办）


### 远程分支合并

git merge origin/master

然后会出现报错，需要[处理冲突](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6#r_basic_merge_conflicts)。

git add + "冲突文件的relative path"

git commit + 回车：这个时候会出来vi文本编辑器，编辑完成后，push即可。

### 变基

#### 人员A的行为(想将子分支合并到master上)

1. 去子分支；git rebase master

2. 处理冲突；

3. (指针哈希值，奇怪) git add README.md

4. (指针哈希值，奇怪) git rebase --continue

5. git会自动跳回到了experiment分支，变基完成

#### 人员B的行为（之前在master分支上开发）

理想情况下直接git fetch之后merge。除此之外，需要一些特殊的[解决方法](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA#r_rebase_rebase)。"总的原则是，只对尚未推送或分享给别人的本地修改执行变基操作清理历史，从不对已推送至别处的提交执行变基操作"。






