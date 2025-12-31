interface BookCardProps {
  title: string;
  author: string;
  cover: string;
}

const BookCard = ({ title, author, cover }: BookCardProps) => {
  return (
    <div className="book-card">
      <img src={cover} alt={title} className="book-cover" />
      <h3 className="book-title">{title}</h3>
      <p className="book-author">{author}</p>
    </div>
  );
};

export default BookCard;
