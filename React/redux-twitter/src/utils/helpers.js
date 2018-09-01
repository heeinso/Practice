export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('ko-KR');
  console.log('fucking time: ', time);
  return `${time.slice(0, 2)} ${time.substr(2, 5)}${
    time.substr(7, 1) !== ':' ? time.substr(7, 1) : ''
  } |  ${d.toLocaleDateString('ko-KR')}`;
}
export function formatTweet(tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet;
  const { name, avatarURL } = author;
  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet
      ? null
      : {
          author: parentTweet.author,
          id: parentTweet.id,
        },
  };
}
