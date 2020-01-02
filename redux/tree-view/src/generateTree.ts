interface ITree {
  [key: number]: INode;
}

interface INode {
  id: number;
  counter: number;
  childIds: number[];
}

const generateTree = () => {
  let tree: ITree = {
    0: {
      id: 0,
      counter: 0,
      childIds: []
    }
  };

  for (let i = 0; i < 1000; i++) {
    const parentId = Math.floor(Math.pow(Math.random(), 2) * i);
    tree[i] = {
      id: i,
      counter: 0,
      childIds: []
    };
    tree[parentId].childIds.push(i);
  }

  return tree;
};

export default generateTree;
