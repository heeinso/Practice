import React, {Component} from 'react';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {content: ''};
  }

  onSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.onSubmit().bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={e => this.setState({content: e.target.value})}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default LyricCreate;