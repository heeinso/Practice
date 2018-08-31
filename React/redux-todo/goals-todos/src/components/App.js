import React from 'react';
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData);
  }

  render() {
    // if (this.props.loading) {
    //   return (
    //     <div className="lds-heart">
    //       <div />
    //     </div>
    //   );
    // }

    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.loading,
}))(App);
