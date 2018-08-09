---
title: DelayQueue使用
tags:
  - 程序员
  - Java
categories:
  - 程序员
toc: false
date: 2018-08-09 14:47:52
---

## DelayQueue特性
- 队列中的元素都必须实现Delayed，元素可以指定延迟消费时长。
- 实现了BlockingQueue接口，所以他是一个阻塞队列。
- 本质上是基于PriorityQueue实现的。

## 贴一段我在实际生产环境中使用到代码
### 队列管理
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.DelayQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * @author Gao Youbo
 * @since 2018-07-26 19:53
 */
public class DelayQueueManager {
    private static final Logger LOG = LoggerFactory.getLogger(DelayQueueManager.class);

    private String name;
    private ExecutorService executor;
    private Thread monitorThread;
    private DelayQueue<DelayTask<?>> delayQueue; // 延时队列

    public DelayQueueManager(String name, int poolSize) {
        this.name = name;
        this.executor = Executors.newFixedThreadPool(poolSize);
        this.delayQueue = new DelayQueue<>();
        init();
    }

    /**
     * 初始化
     */
    private void init() {
        monitorThread = new Thread(() -> {
            execute();
        }, "DelayQueueMonitor-" + name);
        monitorThread.start();
    }

    private void execute() {
        while (true) {
            LOG.info("当前延时任务数量:" + delayQueue.size());
            try {
                // 从延时队列中获取任务
                DelayTask<?> delayTask = delayQueue.take();
                if (delayTask != null) {
                    Runnable task = delayTask.getTask();
                    if (task != null) {
                        // 提交到线程池执行task
                        executor.execute(task);
                    }
                }
            } catch (Exception e) {
                LOG.error(null, e);
            }
        }
    }

    /**
     * 添加任务
     *
     * @param id   任务编号
     * @param task 任务
     * @param time 延时时间
     * @param unit 时间单位
     */
    public void put(String id, Runnable task, long time, TimeUnit unit) {
        long timeout = TimeUnit.MILLISECONDS.convert(time, unit);
        long delayTimeMillis = System.currentTimeMillis() + timeout;
        delayQueue.put(new DelayTask<>(id, delayTimeMillis, task));
    }

    /**
     * 添加任务
     *
     * @param id              任务编号
     * @param task            任务
     * @param delayTimeMillis 延迟到什么时间点
     */
    public void putAt(String id, Runnable task, long delayTimeMillis) {
        delayQueue.put(new DelayTask<>(id, delayTimeMillis, task));
    }

    /**
     * 根据任务编号删除任务
     *
     * @param id
     * @return
     */
    public boolean removeTaskById(String id) {
        DelayTask task = new DelayTask(id, 0, null);
        return delayQueue.remove(task);
    }

    /**
     * 删除任务
     *
     * @param task
     * @return
     */
    public boolean removeTask(DelayTask task) {
        return delayQueue.remove(task);
    }
}
```

### 延迟任务对象
```java

import java.util.Objects;
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

/**
 * @author Gao Youbo
 * @since 2018-07-26 19:54
 */
public class DelayTask<T extends Runnable> implements Delayed {
    private final String id;
    private final long delayTimeMillis; // 延迟到什么时间点执行
    private final T task; // 任务

    public DelayTask(String id, long delayTimeMillis, T task) {
        this.id = id;
        this.delayTimeMillis = delayTimeMillis;
        this.task = task;
    }

    public T getTask() {
        return task;
    }

    @Override
    public int compareTo(Delayed o) {
        DelayTask other = (DelayTask) o;
        long diff = delayTimeMillis - other.delayTimeMillis;
        if (diff > 0) {
            return 1;
        } else if (diff < 0) {
            return -1;
        } else {
            return 0;
        }
    }

    @Override
    public long getDelay(TimeUnit unit) {
        return unit.convert(this.delayTimeMillis - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DelayTask<?> delayTask = (DelayTask<?>) o;
        return Objects.equals(id, delayTask.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
```

