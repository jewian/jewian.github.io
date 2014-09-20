---
layout: post
title: AtomikosSQLException: The underlying XA session is closed
date: 2014-02-02 00:00

published: true
comments: true
tags: Atomikos Mybatis XA
---

My current project is using [Mybatis](http://mybatis.github.io/mybatis-3/) for data persistence, and using [Atomikos TransactionEssentials](http://www.atomikos.com/) as [2PC](http://en.wikipedia.org/wiki/Two-phase_commit_protocol) transaction manager.

In the testing site when there were a few peoples testing, following exception happened from time to time. But you could not always reproduce it.

>Caused by: com.atomikos.jdbc.AtomikosSQLException: The underlying XA session is closed
>   at com.atomikos.jdbc.AtomikosSQLException.throwAtomikosSQLException(AtomikosSQLException.java:44)
>	at com.atomikos.jdbc.AtomikosConnectionProxy.enlist(AtomikosConnectionProxy.java:214)
>	at com.atomikos.jdbc.AtomikosConnectionProxy.invoke(AtomikosConnectionProxy.java:138)
>	at $Proxy31.prepareStatement(Unknown Source)


After investigation for a whole day, finally I found the place causing this error.

``` java
    public static List<DynamicEntity> findByQuery(final String queryId,
            final Map<String, Object> params) throws DataException {
        Connection conn = null;
        SqlSession session = null;
        try {
            conn = DaoFactory.getInstance().getConnection();
            session = DaoFactory.getSession(conn);
            return session.selectList(queryId, params);
        } finally {
            if (session != null) {
                session.close();
            }
            if (conn != null) {
            	conn.close();
            }
        }
    }
```

**RootCause**

The line `session.close()` will close the DB connection implicitly (return to connection pool). If at the same time, another thread (ThreadB) is requesting a new DB connection, connection pool may return the same connection by Atomikos.

The line `conn.close()` closes the connection again. (Ooops, your are right, it is closing the connection already using by ThreadB). Then if ThreadB tries to retrieve data by the connection, `The underlying XA session is closed` exception happens.

After I tried to removed one line of them, the exception was gone.
