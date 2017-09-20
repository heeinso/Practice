import tensorflow as tf
import numpy as np

xy = np.loadtxt('05train.txt', unpack=True, dtype='float32')

x_data = np.transpose(xy[:3])
y_data = np.transpose(xy[3:])

X = tf.placeholder('float', [None, 3])
Y = tf.placeholder('float', [None, 3])

W = tf.Variable(tf.zeros([3, 3]))

hypothesis = tf.nn.softmax(tf.matmul(X, W))

cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), reduction_indices=1))

learning_rate = 0.01
train = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost)

init = tf.initialize_all_variables()

with tf.Session() as sess:
    sess.run(init)

    for step in range(2001):
        sess.run(train, feed_dict={X: x_data, Y:y_data})
        if step % 200 == 0:
            feed = {X: x_data, Y: y_data}
            print('{:4} {:8.6}'.format(step, sess.run(cost, feed_dict=feed)), *sess.run(W))

    print('-------------------------------')

    a = sess.run(hypothesis, feed_dict={X: [[1, 11, 7]]})
    print("a :", a, sess.run(tf.argmax(a, 1))) # a : [[ 0.68849683  0.26731509  0.04418806]] [0]

    b = sess.run(hypothesis, feed_dict={X: [[1, 3, 4]]})
    print("b :", b, sess.run(tf.argmax(b, 1))) # b : [[ 0.2432227   0.44183081  0.3149465 ]] [1]

    c = sess.run(hypothesis, feed_dict={X: [[1, 1, 0]]})
    print("c :", c, sess.run(tf.argmax(c, 1))) # c : [[ 0.02974809  0.08208466  0.8881672 ]] [2]

    d = sess.run(hypothesis, feed_dict={X: [[1, 11, 7], [1, 3, 4], [1, 1, 0]]})
    print("d : ", *d, end=' ')
    print(sess.run(tf.argmax(d, 1))) # d :  ...  [0 1 2]



