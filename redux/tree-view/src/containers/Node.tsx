import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";

type returnType = {
  type: string;
  nodeId: number;
  childId?: number;
};

interface IProps {
  id: number;
  parentId: number;
  counter: number;
  childIds: number[];
  increment(nodeId: number): returnType;
  createNode(): returnType;
  deleteNode(nodeId: number): returnType;
  addChild(nodeId: number, childId: number): returnType;
  removeChild(nodeId: number, childId: number): returnType;
}

const mapStateToProps = (state: any, ownProps: any) => {
  return state[ownProps.id];
};

export class Node extends React.Component<IProps> {
  handleIncrementClick = () => {
    const { increment, id } = this.props;
    increment(id);
  };

  handleAddChildClick = (e: any) => {
    e.preventDefault();
    const { addChild, createNode, id } = this.props;
    const childId = createNode().nodeId;
    addChild(id, childId);
  };

  handleRemoveClick = (e: any) => {
    e.preventDefault();
    const { removeChild, deleteNode, parentId, id } = this.props;
    removeChild(parentId, id);
    deleteNode(id);
  };

  renderChild = (childId: number) => {
    const { id } = this.props;
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    );
  };

  render() {
    const { counter, parentId, childIds } = this.props;
    return (
      <div>
        Counter: {counter}
        <button onClick={this.handleIncrementClick}>+</button>
        {!!parentId && (
          <span
            style={{ color: "lightgray", textDecoration: "none" }}
            onClick={this.handleRemoveClick}
          >
            ×
          </span>
        )}
        <ul>
          {childIds.map(this.renderChild)}
          <li key="add">
            <span onClick={this.handleAddChildClick}>Add child</span>
          </li>
        </ul>
      </div>
    );
  }
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);

export default ConnectedNode;
