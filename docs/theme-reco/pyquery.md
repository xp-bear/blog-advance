---
title: pyquery的基本操作
date: 2022/07/26
---

pyquery 是一个类似 jquery 的 python 库，它实现能够在 xml 文档中进行 jQuery 查询，pyquery 使用 lxml 解析器进行快速在 xml 和 html 文档上操作，它提供了和 jQuery 类似的语法来解析 HTML 文档，支持 CSS 选择器，使用非常方便

## 1、pyquery 安装

pip 方式安装：

```py
pip install pyquery

#它依赖cssselect和lxml包
pyquery==1.4.0
 - cssselect [required: >0.7.9, installed: 1.0.3] #CSS选择器并将它转换为XPath表达式
 - lxml [required: >=2.1, installed: 4.2.2] #处理xml和html解析库
```

## 2、pyquery 对象初始化

pyquery 首先需要传入 HTML 文本来初始化一个 pyquery 对象，它的初始化方式有多种，如直接传入字符串，传入 URL 或者传入文件名

### （1）字符串初始化

```py
from pyquery import PyQuery as pq

html=
'''
    <div id="wenzhangziti" class="article 389862">
        <p>人生是一条没有尽头的路，不要留恋逝去的梦，把命运掌握在自己手中，让我们来掌握自己的命运，别让别人的干扰与诱惑，别让功名与利禄，来打翻我们这坛陈酿已久的命运之酒！</p>
    </div>
'''
doc=pq(html) #初始化并创建pyquery对象
print(type(doc))
print(doc('p').text())

#输出
<class 'pyquery.pyquery.PyQuery'>
人生是一条没有尽头的路，不要留恋逝去的梦，把命运掌握在自己手中，让我们来掌握自己的命运，别让别人的干扰与诱惑，别让功名与利禄，来打翻我们这坛陈酿已久的命运之酒！
```

### （2）URL 初始化

```py
from pyquery import PyQuery as pq

doc=pq(url='https://www.cnblogs.com/zhangxinqi/p/9218395.html')
print(type(doc))
print(doc('title'))

#输出
<class 'pyquery.pyquery.PyQuery'>
<title>python3解析库BeautifulSoup4 - Py.qi - 博客园</title>&#13;
```
