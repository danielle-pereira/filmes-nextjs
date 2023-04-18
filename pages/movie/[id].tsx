// página de listagem dos filme

import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next';

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
};

type MovieProps = {
  movie: Movie;
};

export default function Movie({ movie }: MovieProps) {
  const { Title, Year, Plot, Poster } = movie;

  return (
    <div>
      <h1>
        {Title} ({Year})
      </h1>
      <img src={Poster} alt={Title} />
      <p>{Plot}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<MovieProps> = async ({ params }) => {
  let movie = null;

  if (params && typeof params.id === 'string') {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=bff8a114&i=${params.id}`);
    movie = response.data;
  }

  return {
    props: {
      movie,
    },
  };
};
