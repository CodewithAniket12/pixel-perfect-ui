import '@/styles/gutenberg.css';

var BookCard = function(props) {
  var title = props.title;
  var author = props.author;
  var cover = props.cover;
  var onClick = props.onClick;

  return (
    <div className="book-card" onClick={onClick}>
      <img src={cover} alt={title} className="book-cover" />
      <h3 className="book-title">{title}</h3>
      <p className="book-author">{author}</p>
    </div>
  );
};

export default BookCard;
