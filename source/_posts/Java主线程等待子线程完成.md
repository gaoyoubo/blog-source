---
title: Java主线程等待子线程完成
author: 雾非雾的情思
date: 2014-05-16 00:00:00
---
    import static java.lang.Thread.sleep;
    
    /**
     *
     * @author Gao Youbo
     * @since 2014-05-16 10:20:08
     */
    public class Test {
    
        public static void main(String[] args) {
            SubThread thread = new SubThread();
            thread.start(); //子线程开始
            mainThreadWorking();//主线程干活
            System.out.println("main:等待子线程完成");
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("所有线程都完成！");
        }
    
        private static void mainThreadWorking() {
            System.out.println("main:主线程开始干活...");
            try {
                Thread.sleep(2000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("main:主线程干完了!");
        }
    }
    
    class SubThread extends Thread {
    
        @Override
        public void run() {
            try {
                System.out.println("sub:子线程开始干活...");
                sleep(6000L); //子线程花6秒钟时间干活
                System.out.println("sub:子线程干完了!");
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
        }
    
    }