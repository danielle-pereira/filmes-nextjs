// página inicial com imput de pesquisa

import { useState } from 'react';
import Link from 'next/link';

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async () => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=bff8a114&s=${searchTerm}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-4xl font-bold">Todos os seus filmes em um só lugar</p>
      <div className="mt-8">
        <input
          type="text"
          className="border-gray-400 border-2 p-2"
          placeholder="Procure seu filme predileto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
        >
          Buscar
        </button>
      </div>
      {movies.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-4">
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <Link href={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
                <h2 className="text-lg font-bold">{movie.Title}</h2>
                <p className="text-gray-500">{movie.Year}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-gray-500"></p>
      )}
    </div>
  );
}
