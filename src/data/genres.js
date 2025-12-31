import FictionIcon from '@/assets/icons/Fiction.svg';
import DramaIcon from '@/assets/icons/Drama.svg';
import HumourIcon from '@/assets/icons/Humour.svg';
import PoliticsIcon from '@/assets/icons/Politics.svg';
import HistoryIcon from '@/assets/icons/History.svg';
import AdventureIcon from '@/assets/icons/Adventure.svg';

// Note: Philosophy icon is not provided, using Fiction as placeholder
// You can replace it when you have the Philosophy icon

export var genres = [
  {
    id: 'fiction',
    name: 'FICTION',
    icon: FictionIcon,
    path: '/books/fiction'
  },
  {
    id: 'philosophy',
    name: 'PHILOSOPHY',
    icon: FictionIcon, // Placeholder - replace with Philosophy icon
    path: '/books/philosophy'
  },
  {
    id: 'drama',
    name: 'DRAMA',
    icon: DramaIcon,
    path: '/books/drama'
  },
  {
    id: 'history',
    name: 'HISTORY',
    icon: HistoryIcon,
    path: '/books/history'
  },
  {
    id: 'humour',
    name: 'HUMOUR',
    icon: HumourIcon,
    path: '/books/humour'
  },
  {
    id: 'adventure',
    name: 'ADVENTURE',
    icon: AdventureIcon,
    path: '/books/adventure'
  },
  {
    id: 'politics',
    name: 'POLITICS',
    icon: PoliticsIcon,
    path: '/books/politics'
  }
];
