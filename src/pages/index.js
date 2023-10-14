import { Inter } from 'next/font/google';
import SearchBar from '@/features/searchBar/SearchBar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <SearchBar></SearchBar>
    </>
      
  );
}
