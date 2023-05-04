// Importando o módulo GetServerSideProps do Next.js e o módulo axios
import { GetServerSideProps } from 'next';
import axios from 'axios';

// Definindo um tipo para o objeto Movie que será retornado pela API
type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
};

// Definindo um tipo para as propriedades da página Movie
type MovieProps = {
  movie: Movie;
};

// Definindo o componente Movie que será renderizado na página
export default function Movie({ movie }: MovieProps) {
  const { Title, Year, Plot, Poster } = movie;

  // Renderizando o título, o ano, o poster e o enredo do filme
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

// Definindo a função getServerSideProps que irá buscar os dados do filme na API do OMDB
export const getServerSideProps: GetServerSideProps<MovieProps> = async ({ params }) => {
  let movie = null;

  // Verificando se o parâmetro de ID do filme foi passado e é uma string
  if (params && typeof params.id === 'string') {

    // Fazendo uma requisição GET para a API do OMDB com o ID do filme como parâmetro e a chave de acesso
    const response = await axios.get(`http://www.omdbapi.com/?apikey=bff8a114=${params.id}`);
    
    // Atribuindo os dados do filme à variável movie
    movie = response.data;
  }

  // Retornando as propriedades do componente Movie
  return {
    props: {
      movie,
    },
  };
};
