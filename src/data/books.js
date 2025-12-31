// Book covers
import oldManSea from '@/assets/books/old-man-sea.png';
import belialStone from '@/assets/books/belial-stone.png';
import reaction from '@/assets/books/reaction.png';
import greatExpectations from '@/assets/books/great-expectations.png';
import christmasCarol from '@/assets/books/christmas-carol.png';
import harryPotterHalf from '@/assets/books/harry-potter-half.png';
import oliverTwist from '@/assets/books/oliver-twist.png';
import tomSawyer from '@/assets/books/tom-sawyer.png';
import percyJackson from '@/assets/books/percy-jackson.png';
import harryPotterDeathly from '@/assets/books/harry-potter-deathly.png';
import beastsBlackHole from '@/assets/books/beasts-black-hole.png';
import taleTwoCities from '@/assets/books/tale-two-cities.png';

export var books = [
  {
    id: '1',
    title: 'THE OLD MAN AND THE SEA',
    author: 'Charles Dickens',
    cover: oldManSea,
    genre: 'fiction'
  },
  {
    id: '2',
    title: 'THE BELIAL STONE',
    author: 'R.D Brady',
    cover: belialStone,
    genre: 'fiction'
  },
  {
    id: '3',
    title: 'REACTION - THE END OF IRON AGE',
    author: 'Seth M Baker',
    cover: reaction,
    genre: 'fiction'
  },
  {
    id: '4',
    title: 'GREAT EXPECTATIONS',
    author: 'Charles Dickens',
    cover: greatExpectations,
    genre: 'fiction'
  },
  {
    id: '5',
    title: 'A CHRISTMAS CAROL',
    author: 'Charles Dickens',
    cover: christmasCarol,
    genre: 'fiction'
  },
  {
    id: '6',
    title: 'HARRY POTTER AND THE HALF BLOOD PRINCE',
    author: 'J.K Rowling',
    cover: harryPotterHalf,
    genre: 'fiction'
  },
  {
    id: '7',
    title: 'OLIVER TWIST',
    author: 'Charles Dickens',
    cover: oliverTwist,
    genre: 'fiction'
  },
  {
    id: '8',
    title: 'THE ADVENTURES OF TOM SAWYER',
    author: 'Mark Twain',
    cover: tomSawyer,
    genre: 'fiction'
  },
  {
    id: '9',
    title: 'PERCY JACKSON AND THE OLYMPIANS',
    author: 'Rick Riordan',
    cover: percyJackson,
    genre: 'fiction'
  },
  {
    id: '10',
    title: 'HARRY POTTER AND THE DEATHLY HALLOWS',
    author: 'J.K Rowling',
    cover: harryPotterDeathly,
    genre: 'fiction'
  },
  {
    id: '11',
    title: 'THE BEASTS OF THE BLACK HOLE',
    author: 'Paul Parker',
    cover: beastsBlackHole,
    genre: 'fiction'
  },
  {
    id: '12',
    title: 'A TALE OF TWO CITIES',
    author: 'Charles Dickens',
    cover: taleTwoCities,
    genre: 'fiction'
  },
  // Drama books
  {
    id: '13',
    title: 'GREAT EXPECTATIONS',
    author: 'Charles Dickens',
    cover: greatExpectations,
    genre: 'drama'
  },
  {
    id: '14',
    title: 'A CHRISTMAS CAROL',
    author: 'Charles Dickens',
    cover: christmasCarol,
    genre: 'drama'
  },
  {
    id: '15',
    title: 'OLIVER TWIST',
    author: 'Charles Dickens',
    cover: oliverTwist,
    genre: 'drama'
  },
  // Humour books
  {
    id: '16',
    title: 'THE ADVENTURES OF TOM SAWYER',
    author: 'Mark Twain',
    cover: tomSawyer,
    genre: 'humour'
  },
  {
    id: '17',
    title: 'A CHRISTMAS CAROL',
    author: 'Charles Dickens',
    cover: christmasCarol,
    genre: 'humour'
  },
  // Politics books
  {
    id: '18',
    title: 'A TALE OF TWO CITIES',
    author: 'Charles Dickens',
    cover: taleTwoCities,
    genre: 'politics'
  },
  {
    id: '19',
    title: 'GREAT EXPECTATIONS',
    author: 'Charles Dickens',
    cover: greatExpectations,
    genre: 'politics'
  },
  // Philosophy books
  {
    id: '20',
    title: 'THE OLD MAN AND THE SEA',
    author: 'Charles Dickens',
    cover: oldManSea,
    genre: 'philosophy'
  },
  {
    id: '21',
    title: 'A TALE OF TWO CITIES',
    author: 'Charles Dickens',
    cover: taleTwoCities,
    genre: 'philosophy'
  },
  // History books
  {
    id: '22',
    title: 'A TALE OF TWO CITIES',
    author: 'Charles Dickens',
    cover: taleTwoCities,
    genre: 'history'
  },
  {
    id: '23',
    title: 'GREAT EXPECTATIONS',
    author: 'Charles Dickens',
    cover: greatExpectations,
    genre: 'history'
  },
  // Adventure books
  {
    id: '24',
    title: 'THE ADVENTURES OF TOM SAWYER',
    author: 'Mark Twain',
    cover: tomSawyer,
    genre: 'adventure'
  },
  {
    id: '25',
    title: 'PERCY JACKSON AND THE OLYMPIANS',
    author: 'Rick Riordan',
    cover: percyJackson,
    genre: 'adventure'
  },
  {
    id: '26',
    title: 'HARRY POTTER AND THE DEATHLY HALLOWS',
    author: 'J.K Rowling',
    cover: harryPotterDeathly,
    genre: 'adventure'
  },
];

export var getBooksByGenre = function(genre) {
  return books.filter(function(book) {
    return book.genre === genre.toLowerCase();
  });
};
