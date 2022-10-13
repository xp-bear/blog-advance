# 多线程教程

## 1.进程、线程、程序的基本概念: 

1.程序：由源代码组成的 可执行。

2.进程：程序运行资源（内存资源）分配的最小单位。一个进程下可以有多个线程，但是，至少有一个线程（主线程）。进程之间相互独立，互不影响，资源不共享。

3.线程：CPU调度的最小单位。必须依赖于进程存在，同一个进程之间的多个线程资源是共享的。

4.协程：又叫微线程，是比线程还要小的一个单位，协程不是计算机提供的，是程序员自己创造出来的。协程是一种用户态内的上下文切换技术，简单来说：就是通过一个线程去实现代码块（函数）之间的相互切换执行。(单线程实现的并发操作)。



协程的特点: asyncio  aiohttp  aiomysql

使用协程不需要考虑全局变量的安全性问题

协程必须要在单线程中实现并发

当一个协程遇到 IO 操作时，会自动的切换到另一个协程中继续执行。

## 2.多线程创建方式

### 2.1 直接创建线程的方式

```py
import time
import threading
import random


def download():
    print('开始下载')
    time.sleep(random.randint(1, 5))
    print('下载结束')


if __name__ == '__main__':
    # 使用循环，创建3个线程
    for i in range(3):
        # 创建线程
        t = threading.Thread(target=download)

        # 启动线程
        t.start()
```

### 2.2 线程传递参数

```py
import time
import threading
import random


def download(filename):
    print(filename, '开始下载')
    time.sleep(random.randint(1, 5))
    print(filename, '下载结束')


if __name__ == '__main__':
    # 使用循环，创建3个线程
    for i in range(3):
        # 创建线程
        t = threading.Thread(target=download, args=(i,))

        # 启动线程
        t.start()
```

![](http://mk.xxoutman.cn/img/image-20220930151434892.png)

### 2.3 使用类创建多线程

步骤 :
1，自定义一个类

2，继承Thread类

3，重写run（）方法

 ```py
 import random
 import threading
 import time
 import random
 
 
 class MyThread(threading.Thread):
     # 重写run方法
     def run(self):
         print('开始下载')
         time.sleep(random.randint(1, 5))
         print('下载完成')
         pass
 
 
 if __name__ == '__main__':
     # 创建3个线程
     for i in range(3):
         # 实例化对象 (创建线程)
         t = MyThread()
 
         # 启动线程,自动执行run方法
         t.start()
 ```

类创建线程,传递参数

```py
import random
import threading
import time
import random


class MyThread(threading.Thread):
    # 定义初始化方法
    def __init__(self, filename):
        # 处理父类的init方法
        # 第一种
        # threading.Thread.__init__(self)
        # 第二种
        super().__init__()

        self.filename = filename

    # 重写run方法
    def run(self):
        print(self.filename, '开始下载')
        time.sleep(random.randint(1, 5))
        print(self.filename, '下载完成')
        pass


if __name__ == '__main__':
    # 创建3个线程
    for i in range(3):
        # 实例化对象 (创建线程)
        t = MyThread(i)

        # 启动线程,自动执行run方法
        t.start()

```

### 2.4 线程名称

获取线程名称

```py
import threading


class MyThread(threading.Thread):
    def run(self):
        # 获取当前线程
        print(f'{threading.current_thread()}正在运行!')
        # name属性,默认名称是 : thread-n  n是一个数字
        print(f'线程名称是{self.name}')


if __name__ == '__main__':
    for i in range(5):
        # 实例化对象
        t = MyThread()
        # 启动线程
        t.start()
```

修改线程名称

![image-20220930160042087](http://mk.xxoutman.cn/img/image-20220930160042087.png)

### 2.5 线程共享全局变量

```py
import threading

# 定义一个初始值
value = 0


# 定义+1函数
def add_value():
    global value
    for i in range(1000000):
        value += 1
    print(value)


if __name__ == '__main__':
    for i in range(2):
        t = threading.Thread(target=add_value)
        t.start()

# 输出的值随机
# 1168077
# 1370103
```

上面这个代码,就会导致全局变量资源竞争问题，导致 value 的值不准确。

解决方案:  加锁与解锁

```py
import threading

# 创建锁
lock = threading.Lock()

# 定义一个初始值
value = 0


# 定义+1函数
def add_value():
    global value
    # 枷锁
    lock.acquire()
    for i in range(1000000):
        value += 1
    # 解锁
    lock.release()
    print(value)


if __name__ == '__main__':
    for i in range(2):
        t = threading.Thread(target=add_value)
        t.start()
```

## 3.生产者与消费者模式

![image-20221008150359994](http://mk.xxoutman.cn/img/image-20221008150359994.png)

```py
import threading
import random
from time import sleep

# 定义银行存款
g_money = 1000

# 定义生产次数
g_times = 0

# 定义锁
lock = threading.Lock()


# 定义生产者类
class Productor(threading.Thread):
    # 重写run方法
    def run(self):
        global g_money
        global g_times
        # 保证经济,死循环
        while True:

            # 枷锁
            lock.acquire()
            if g_times > 10:
                lock.release()
                break

            # 挣钱方法
            money = random.randint(100, 1000)
            g_money += money
            g_times += 1
            print(f'{threading.current_thread()}挣了{money}元钱')
            # 解锁
            lock.release()
            sleep(0.5)


# 定义消费者类
class Consume(threading.Thread):
    # 重写run方法
    def run(self):
        global g_money

        while True:
            # 枷锁
            lock.acquire()
            # 定义消费的钱数
            money = random.randint(100, 1000)
            if g_money >= money:
                g_money -= money
                print(f'{threading.current_thread()}消费了{money}钱,还剩{g_money}钱')
            else:
                if g_times > 10:
                    # 释放锁
                    lock.release()
                    break
                print(f'{threading.current_thread()}准备消费{money}钱,余额不足')
            # 解锁
            lock.release()
            sleep(0.5)


if __name__ == '__main__':
    # 3个生产者 , 5个消费者
    for i in range(3):
        # 实例化对象
        p = Productor()
        p.start()

    # 定义5个消费者
    for j in range(5):
        c = Consume()
        c.start()
```

## 4.队列

```py
# 导入队列（先进先出）
from queue import Queue

# 创建一个Queue对象
q = Queue(maxsize=4)  # 队列最多有4个数据

# put：向队列中添加元素
q.put(1)
q.put(2)
q.put(3)
q.put(4)
# q.put(5)

# 注：如果队列满了，再put() 添加数据，程序不报错，而是进入阻塞状态 (等待从队列中取出元素)

# get：取出队列中的元素
print(q.get())
print(q.get())
print(q.get())
print(q.get())

# 注意：get() 如果队列空了，再获取元素，会使程序进入阻塞状态


# full（）判断队列是否为满，返回值是布尔值
# empty（）判断队列是否为空，返回值是布尔值

# 队列在爬虫中的使用:
# 1.将爬取的URL存放到队列中，每次生产者进行爬取时，会从队列中取出URL进行请求。
# 2.将生产者爬取到的数据存放到队列中。消费者从队列中取出数据，保存即可。
```

## 5.腾讯招聘-单线程

```py
import requests
from time import sleep

base_url = 'https://careers.tencent.com/tencentcareer/api/post/Query'

params = {
    'pageIndex': 1,
    'pageSize': 10,
    'language': 'zh-cn',
    'area': 'cn'
}

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
}

for page in range(1, 11):
    params['pageIndex'] = page

    # 发起请求,接受响应
    response = requests.get(url=base_url, headers=headers, params=params)

    Posts = response.json()['Data']['Posts']
    for post in Posts:
        # 获取岗位名称
        RecruitPostName = post['RecruitPostName']
        # 获取事业群
        BGName = post['BGName']
        # 工作地点
        LocationName = post['LocationName']
        # 职业类别
        CategoryName = post['CategoryName']
        # 发布日期
        LastUpdateTime = post['LastUpdateTime']
        
        print(RecruitPostName, BGName, LocationName, CategoryName, LastUpdateTime)
        # 数据保存 保存到文件中
        with open('./jod.txt', 'a+', encoding='utf-8') as f:
            f.write(f'{RecruitPostName}\t\t{BGName}\t{LocationName}\t{CategoryName}\t{LastUpdateTime}\n')

```







## 6.腾讯招聘-多线程







