# private git with npm


## private:
+ https://www.douban.com/note/617409014/


版权归作者所有，任何形式转载请联系作者。
作者：U_U（来自豆瓣）
来源：https://www.douban.com/note/617409014/

做过 Node.js 开发的同学, 我们都知道通过 npm 来安装和使用开源的模块.

但如果是公司内部的私有模块呢? 如何将模块在公司内部公共出来, 又如何发布, 如何安装, 在多个项目中投入使用呢? 我们总不能将这些模块都 npm publish 上去公诸于众吧. 而且你肯定也不想公共模块是复制到各个项目中来使用的吧, 如果那样的话, 当公共模块有更新的时候, 我们岂不是要通知各个项目重新覆盖一份? 突然觉得心好累啊. ┭┮﹏┭┮

因此为了让我们可以在公司内部安装和使用私有模块, 我们需要打造一个 npm 私有仓库(npm private repository)来集中存放公司的私有模块, 要使用这些私有模块的项目只需要添加依赖安装即可.

但如果要打造一个完整的 npm 私有仓库, 需要服务器, 需要安装环境. 但其实首先第一步我们只是想简简单单地在公司内部共享些私有模块, 那么 npm+git 足以. 当然这个方案是有[弊端](#弊端)的, 但这并不妨碍它做为我们初期的一个快速解决方案, 后期是可以慢慢过渡升级到使用完整 npm 私有仓库的解决方案的.

## 新建 npm 私有模块

下面以一个实例来说明如何在 GitLab 中新建一个 npm 私有模块, 假设我们要新建的私有模块名为: `hello-private`

* 在 GitLab 上新建一个 project, 名字为: `hello-private`

  对于公共模块, 最好是放在同一个 group 下, 例如放在 `companyfe` 这个 group 下. 那么以后所有公共模块的 git 地址就可以统一为: `http://git.your-inc.com/{group}/{project}.git`

* 将项目 clone 下来 

 `git clone http://git.your-inc.com/companyfe/hello-private.git`

* 添加 `package.json` 配置, 注意限定 `@scope`

 `npm init --scope=companyfe`

* 然后提交 push 上去

到这里私有模块就已经发布好了, 如果有项目要使用, 就配置下项目的 dependencies 即可.

## 使用私有模块

* 添加私有模块的依赖

  在项目的 `package.json` 中添加依赖, 例如: 依赖 `@companyfe/hello-private` 这个私有模块

  ```json
 "@companyfe/hello-private": "git+http://git.your-inc.com/companyfe/hello-private.git"
  ```

* 安装私有模块

  跟安装开源的模块一样, 使用 `npm install` 安装依赖即可. 私有模块会安装在 `@scope` 的子文件夹中, 例如: `node_modules/@companyfe/hello-private`.

* 使用私有模块

  跟使用开源的模块一样, 我们只要写对应的包名即可. 私有模块的包名只是带有 `@scope` 而已.

  ```javascript
 var hello = require('@companyfe/hello-private');
  ```

* 更新私有模块

  如果私有模块的版本更新了, 由于 npm+git 方案的[弊端](#弊端), 我们使用 `npm update` 是无法更新私有模块的, 只能通过 `npm install @companyfe/hello-private` 这样的方式来重新安装一次私有模块, 才能获取到最新版本的私有模块.

## 注意: 私有模块的规范

* `package.json#name` 必须限定 `@scope`

 `@scope` 一般为 GitLab group 的名字, 例如 `@companyfe`, 那么 `name` 为: `@companyfe/hello-private`

* `package.json#private` 设置为 `true`

   防止你一不小心将私有模块 publish 上去就麻烦了

## 弊端

* [sinopia](https://github.com/rlidwka/sinopia#similar-existing-things)

 > npm + git (I mean, using git+ssh:// dependencies) - most people seem to use this, but it's a terrible idea... npm update doesn't work, can't use git subdirectories this way, etc.

## 参考

* [can you host a private repository for your organization to use with npm?](http://stackoverflow.com/questions/7575627/can-you-host-a-private-repository-for-your-organization-to-use-with-npm)

 > you can specify private git repositories urls as a dependency in your package.json files.
 >
 > [Private npm modules](http://debuggable.com/posts/private-npm-modules:4e68cc7d-1ac4-42d9-995a-343dcbdd56cb)

* [Working with private modules](https://docs.npmjs.com/private-modules/intro)

 > All private packages are scoped. If a package's name begins with `@`, then it is a scoped package. The scope is everything in between the `@` and the slash.

* [npm-scope Scoped packages](https://docs.npmjs.com/misc/scope)

 > When used in package names, scopes are preceded by an `@` symbol and followed by a slash. Scopes are a way of grouping related packages together.

* [Git URLs as Dependencies](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies)

 > The `commit-ish` can be any tag, sha, or branch which can be supplied as an argument to `git checkout`. The default is `master`.