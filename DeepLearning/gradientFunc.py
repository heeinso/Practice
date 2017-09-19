def cost(W, X, y):
    s = 0
    for i in range(len(X)):
        s += (W * X[i] - y[i]) ** 2

    return s / len(X)

def gradients(W, X, y):
    nX = []
    for i in range(len(X)):
        nX.append(W * X[i] - y[i])

    s = 0
    for i in range(len(X)):
        s += nX[i] * X[i]

    return s / len(X)

X = [1., 2., 3.]
Y = [1., 2., 3.]

W = 100
for i in range(1000):
    c = cost(W, X, Y)
    g = gradients(W, X, Y)
    W = W - g*0.01

    if c < 1.0e-15:
        break

    if i%20 == 19:
        print('{:4} : {:17.12f} {:12.8f} {:12.8f}'.format(i+1, c, g, W))


