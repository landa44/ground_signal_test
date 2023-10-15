import { Inter } from 'next/font/google';
import SearchBar from '@/features/searchBar/SearchBar';
import Map from '@/features/Map';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className='relative -z-0'>
      <Map/>

      </div>

      <SearchBar></SearchBar>

    </>
  );
}
