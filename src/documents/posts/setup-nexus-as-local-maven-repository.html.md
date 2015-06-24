---
layout: post
title: 用Sonatype Nexus来为Gradle搭建本地maven仓库
date: 2015-06-20 00:00

published: true
comments: true
tags: Build Nexus Maven Gradle
---
不知道什么原因,国很很少maven公共仓库(我是搜不到了). [oschina的公共仓库](http://maven.oschina.net/content/groups/public/)在我这里也时快时慢,有时还不如直接用国外的.

最近经常学习github上一些优秀例子,每次在本地build的时候都要漫长的下载依赖jar包的等待. 下载下来的项目基本都是基于[Maven](https://maven.apache.org/)或[Gradle](https://gradle.org/). 由于Maven和Gradle的本地缓存位置不同,同一个依赖基本也要从远程仓库下载下来两次.

参考了网上一些大神的做法,决定也使用[Sonatype Nexus](http://www.sonatype.org/nexus/)来建立一个本地的Maven仓库(对自己来说就是本机). Maven官方也有[一篇文章](https://maven.apache.org/repository-management.html)介绍建立本地仓库的好处.

##1. 下载安装Sonatype Nexus
到[Sonatype Nexus官网](http://www.sonatype.org/nexus/go/)可以选择下载tar.gz或zip压缩包. 按[这里](https://sonatype-download.global.ssl.fastly.net/nexus/oss/nexus-latest-bundle.tar.gz)直接一下tar.gz格式的压缩包(国内最好使用迅雷等下载工具下载).

解压之后进入`bin`目录下执行`nexus install`安装. 完成后会有一个名字为nexus的windows服务.

> cd nexus-2.11.2-06\bin
>
> nexus install

##2. 启动Nexus服务
在`bin`目录下使用命令`nexus start`和`nexus stop`来启动和停止服务. (当然直接去windows服务那边启动停止也行)

> nexus start

启动成功后,用浏览器就可以访问`localhost:8081/nexus`.

![Nexus Welcome Page](/stuff/nexus-welcome-page.png)

至此,本地的maven仓库已经安装成功. 本地公共仓库地址为: `http://localhost:8081/nexus/content/groups/public/`. 如果需要新建仓库可以用admin/admin123登录.

##3. 配置Gradle使用本地仓库
配置Gradle有两种方法.

#3.1 简单配置
在每个项目的build.gradle声明使用本地maven仓库:
``` groovy
repositories {
    maven {
        url "http://localhost:8081/nexus/content/groups/public"
    }
}
```

#3.2 全局配置
通过全局配置,使本地所有的Gradle项目都默认使用本地仓库. 在(用户目录/.gradle)下的`init.gradle`(如果没有则新建一个)加入:

``` groovy
allprojects {
  ext.RepoConfigurator = {
    maven {
      url = uri('http://localhost:8081/nexus/content/groups/public') }
  }
  buildscript.repositories RepoConfigurator
  repositories RepoConfigurator
}
```
推荐使用这种全局配置的方法,项目上传到github也不需要对build.grade文件做另外的修改.

简单测试了一下,新建一个空的Gradle项目,build的时候能够去本地的Nexus仓库去下载依赖.
> gradle init --type java-library
>
> gradle build

![测试本地Nexus仓库](/stuff/gradle-init-build.png)

##4. 存在问题
Nexus服务器会保存一份本地所有项目用过的依赖. Maven和Gradle也分别有自己的缓存. 这样最多一个依赖在本地就会有三份复制. 如何能够禁止缓存减少硬盘空间占用还值得研究.
> 暂时还觉得不大可能,因为Maven和Gradle本地缓存还会被在Eclipse等IDE里面引用.
