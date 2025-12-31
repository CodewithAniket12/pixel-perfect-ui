import '@/styles/gutenberg.css';

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  onClick: () => void;
}

const BookCard = ({ title, author, cover, onClick }: BookCardProps) => {
  return (
    <div className="book-card" onClick={onClick}>
      <img src={cover} alt={title} className="book-cover" />
      <h3 className="book-title">{title}</h3>
      <p className="book-author">{author}</p>
    </div>
  );
};

export default BookCard;
