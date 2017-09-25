import time

# cell indicates W & b, x means combination of 0 & 1
# x는 (0, 0), (0, 1), (1, 0), (1, 1)의 4가지 가능.
def check(cell, x):
    if None in x:
        return None

    v = cell[0]*x[0] + cell[1]*x[1] + cell[2]

    if v == 0:
        return None

    if v < 0:
        return 0

    return 1


def xor(cell, s1, s2):
    return [check(cell, (s1[i] + s2[i])) for i in range(4)] == [0, 1, 1, 0]


def include(results, new):
    for _, _, av, bv, _ in results:
        if av == new[-2] and bv == new[-1]:
            return True

    return False


start = time.time()

a1 = [(i, j , k) for i in range(-10, 10, 3) for j in range(-10, 10, 3) for k in range(-10, 11, 4)]
a2 = [[check(i, x) for x in [(0,0), (0,1), (1,0), (1,1)]] for i in a1]

b1 = [(i, j , k) for i in range(-10, 10, 3) for j in range(-10, 10, 3) for k in range(-10, 11, 4)]
b2 = [[check(i, x) for x in [(0,0), (0,1), (1,0), (1,1)]] for i in b1]

c1 = [(i, j , k) for i in range(-10, 10, 3) for j in range(-10, 10, 3) for k in range(-10, 11, 4)]

results = []
for i, av in enumerate(a2):
    for j, bv in enumerate(b2):
        for k in c1:
            if xor(k, av, bv) == True:
                new = [a1[i], b1[j], av, bv]

                if include(results, new) == False:
                    new.append(k)
                    results.append(new)

print('elapsed :', time.time() - start)

for i in results:
    print(i)


