import Link from "next/link";
import { useState } from "react";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
// estado

const IndexPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searched, setSearched] = useState(false);
  
  <p>{searchTerm}</p>

  const handleSearch = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=bff8a114&s=${searchTerm}`
    );
    const data = await response.json();
    setMovies(data.Search || []);
    setSearched(true);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  

  return (
    <div>
      {!searched ? (
        <div>
          <form>
            <div className="h-screen flex items-center justify-center bg-black ">
              <img
                alt=""
                className="our-story-card-img"
                src="https://occ-0-5556-3662.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofE77XStKhf5kUHG94DPlTiGYqPeYNtiox-82NWEK0Ls3CnLe3WWClGdiJP.png?r=5cf"
                data-uia="our-story-card-img"
              />
              <div className="space-y-5 p-5">
                <p className="text-white font-bold text-4xl">
                  Divirta-se na sua TV.
                </p>

                <div className="flex items-center justify-center">
                  <input
                    type="text"
                    placeholder="Pesquisar filmes e séries"
                    className="w-1/1 py-2 px-4 border  rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-transparent"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    
                  />
                  
                  <button
                    type="button"
                    className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-200"
                    onClick={handleSearch}
                  >
                    Pesquisar
                  </button>
                </div>
                <br />
              </div>
            </div>
          </form>
          
        </div>
      ) : (
        <div >
          {movies.length > 0 ? (
            <div className="flex flex-wrap justify-between bg-black ">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="inline-block w-1/5 p-6 mt-2 py-1 border rounded bg-black "
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="max-w-full h-auto mb-8"
                  />
                  <div>
                    <h2 className=" text-white text-lg font-bold mb-2">{movie.Title}</h2>
                    <p className="text-white">{movie.Year}</p>
                  </div>
                </div>
              ))}
                  <Link href="/">
                  <button className="text-white bg-red-600 px-10 py-2 rounded-md">
                    Voltar
                  </button>
                </Link>

            </div>
            
          ) : (
            <div className="h-screen flex items-center justify-center bg-black text-white">
              <div className="flex items-center justify-center flex-col">
                <p className="text-lg mt-10 p-6">
                  Nenhum resultado encontrado, digite um nome válido.
                </p>
                <Link href="/">
                  <button className="text-white bg-red-600 px-10 py-2 rounded-md">
                    Voltar
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndexPage;
