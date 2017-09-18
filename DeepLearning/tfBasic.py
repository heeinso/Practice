import tensorflow as tf


def hello():
    a = tf.constant('Hello World!')
    print(a)


    sess = tf.Session()
    result = sess.run(a)

    print(result)
    print(type(result))
    print(result.decode(encoding='utf-8'))
    print(type(result.decode(encoding='utf-8')))

    sess.close()

hello()


def constant():
    a = tf.constant(2)
    b = tf.constant(3)

    with tf.Session() as sess:
        result = sess.run(a+b)
        print(type(result))
        print(result)

        print(result + 7)
        print(type(result + 7))

constant()


def placeholder():
    a = tf.placeholder(tf.int16)
    b = tf.placeholder(tf.int16)

    add = tf.add(a, b)
    mul = tf.mul(a, b)

    with tf.Session() as sess:
        r1 = sess.run(add, feed_dict={a: 2, b: 3})
        r2 = sess.run(mul, feed_dict={a: 2, b: 3})

        print(type(r1))
        print(r1, r2)

placeholder()


def showTensor():
    sess = tf.InteractiveSession()

    x = tf.Variable([1.0, 2.0])
    a = tf.constant([3.0, 3.0])

    x.initializer.run()
    sub = tf.sub(x, a)
    print(sub.eval())

    print('---------------------------')

    print(x.eval())
    print(a.eval())

    b = tf.random_uniform([3], -1.0, 1.0)
    print(type(b))
    print(b.eval())

    w = tf.Variable(tf.random_uniform[5, 3], 0, 32, dtype=tf.int32)
    w.initializer.run()
    print(w.eval())

    print('---------------------------')

    x = [[1., 1.], [10., 2.]]
    print(tf.reduce_mean(x).eval())
    print(tf.reduce_mean(x, 0).eval())
    print(tf.reduce_mean(x, 1).eval())


