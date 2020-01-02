export const INCREMENT: string = `INCREMENT`;
export const CREATE_NODE: string = `CREATE_NODE`;
export const DELETE_NODE: string = `DELETE_NODE`;
export const ADD_CHILD: string = `ADD_CHILD`;
export const REMOVE_CHILD: string = `REMOVE_CHILD`;

export const increment = (nodeId: number) => ({
  type: INCREMENT,
  nodeId
});

let nextId = 0;

export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: nextId++
});

export const deleteNode = (nodeId: number) => ({
  type: DELETE_NODE,
  nodeId
});

export const addChild = (nodeId: number, childId: number) => ({
  type: ADD_CHILD,
  nodeId,
  childId
});

export const removeChild = (nodeId: number, childId: number) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
});
