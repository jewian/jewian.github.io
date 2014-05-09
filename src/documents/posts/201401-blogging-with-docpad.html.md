---
layout: post
title: 用DocPad来写博客
date: 2014-01-17 00:00

published: true
comments: true
tags: Blog
---

用一个名言来重新开始这个Blog:
> 有些事情你现在不过做，可能以后都没机会了!

作为一个码农，深知写作对技术的重要性。曾经也安装过 [Wordpress](http://wordpress.org) (主要是用来做网摘，写得较少)。后来在学习Ruby时候也在GitHub布署过 [Octopress](http://octopress.org/)。Octopress的确是一个很酷的静态博客工具，开始在VMware中的OSX系统使用得很顺利。但后来偿试在Win7系统下发布的时候遇到UTF8编码及代码高亮的问题一直没有解决。

最近偿试开始学习 [MEAN](http://mean.io/) (Mongo, Express, Angular, Node)，中途也了解过一些目前流行的基于Node.js的静态网页生成框架。例如 [Hexo](http://zespia.tw/hexo/)。Hexo跟Octopress很接近，通过文档很容易就能抢建出来一个博客。但折腾了几次以后，通过配置不能实现我想要的功能。跟Hexo作者沟通了几次之后也没能解决，不想也不会改它的源代码，只能放弃。

> 其实就想把所有博客的文章放到子目录wenye.info/blog/下面，然后首页wenye.info及其他页面可以自己定制。

最后能过Google发现了 [DocPad](http://docpad.org)，另个一个貌似很强大的基于Node.js的网页框架。生成静态页只是其中的一个功能。看了[Erv Walter](http://www.ewal.net/)大师的简洁的效果以后就突然喜欢上了它，决定用它来搭建新的博客。页面就先直接使用Erv大师的了(他的整个个人博客都是MIT许可)。希望从现在开始，可以认真的码一些字。

码农，必须以HelloWorld开始:

``` java
public final class HelloWorld {

    public static void main(final String[] args) {
        // TODO Auto-generated method stub
        System.out.println("Hello World");
    }

}
```

<img title="Blog with DocPad" src="/stuff/docpad-logo.gif" />
