import {
  INCREMENT,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE
} from "../actions";

const childIds = (state: any, action: any) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId];
    case REMOVE_CHILD:
      return state.filter((id: number) => id !== action.childId);
    default:
      return state;
  }
};

const node = (state: any, action: any) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        counter: 0,
        childIds: []
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      };
    default:
      return state;
  }
};

const getAllDescendantIds = (state: any, nodeId: number) =>
  state[nodeId].childIds.reduce(
    (acc: any, childId: number) => [
      ...acc,
      childId,
      ...getAllDescendantIds(state, childId)
    ],
    []
  );

const deleteMany = (state: any, ids: number[]) => {
  state = { ...state };
  ids.forEach(id => delete state[id]);
  return state;
};

export default (state: any, action: any) => {
  const { nodeId } = action;
  if (typeof nodeId === "undefined") {
    return state;
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return deleteMany(state, [nodeId, ...descendantIds]);
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  };
};
