// Importação das dependências necessárias
import axios from 'axios'; // Biblioteca para fazer requisições HTTP
import { GetServerSideProps, GetStaticProps } from 'next'; // Tipagem das props passadas para a página

// Tipagem dos dados dos filmes
type Movie = {
  imdbID: string; // ID único do filme no IMDb
  Title: string; // Título do filme
  Year: string; // Ano de lançamento do filme
  Poster: string; // URL do pôster do filme
  Plot: string; // Sinopse do filme
};

// Tipagem das props passadas para a página
type MovieProps = {
  movie: Movie; // Dados do filme
};

// Componente da página de detalhes do filme
export default function Movie({ movie }: MovieProps) {
  // Desestruturação dos dados do filme
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

// Função que busca os dados do filme no servidor
export const getServerSideProps: GetServerSideProps<MovieProps> = async ({ params }) => {
  let movie = null; // Inicialização da variável de dados do filme

  if (params && typeof params.id === 'string') { // Verificação se há um ID de filme válido nos parâmetros da URL
    const response = await axios.get(`http://www.omdbapi.com/?apikey=bff8a114&i=${params.id}`); // Requisição HTTP para buscar os dados do filme na API do OMDb
    movie = response.data; // Atribuição dos dados do filme à variável
  }

  return {
    props: {
      movie, // Passagem dos dados do filme como props para a página
    },
  };
};
