import math
import numpy as np
import matplotlib.pyplot as plt


def sigmoid(z):
    return 1 / (1 + math.e ** -z)

print(sigmoid(100))
print(sigmoid(0))
print(sigmoid(-1))
print(sigmoid(np.array([100, 0, -1])))


def costFunc(W, X, Y):
    m = Y.size
    h = sigmoid(np.dot(W, X))

    cost = -(1/m) * sum(Y*np.log(h) + (1-Y)*np.log(1-h))

    grad = (1/m) * np.dot(X, h-Y)

    return cost, grad

xy = np.loadtxt('ex2data1.txt', unpack=True, dtype='float32', delimiter=',')

x_data = xy[:-1]
y_data = xy[-1]

pos = np.where(y_data==1)
neg = np.where(y_data==0)

t1 = plt.plot(x_data[0, pos], x_data[1, pos], color='black', marker='+', markersize=7)
t2 = plt.plot(x_data[0, neg], x_data[1, neg], markerfacecolor='yellow', marker='o', markersize=7)

plt.xlabel('exam 1 score')
plt.ylabel('exam 2 score')
plt.legend([t1[0], t2[0]], ['Admitted', 'Not admitted'])

plt.show()

n, m = x_data.shape
print('m, n: ', m, n)

x_data = np.vstack((np.ones(m), x_data))

W = np.zeros(n+1)

cost, grad = costFunc(W, x_data, y_data)
print('------------------------------')
print('cost :',  cost)      # cost : 0.69314718056
print('grad :', *grad)      # grad : -0.1 -12.0092164707 -11.2628421021


ㅗ