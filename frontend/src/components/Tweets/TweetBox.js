
import "./TweetBox.css"

function TweetBox ({ tweet: { text, author }}) {
  const { email } = author;
  return (
    <div className="tweet">
      <h3>{email}</h3>
      <p>{text}</p>
    </div>
  );
}

export default TweetBox;