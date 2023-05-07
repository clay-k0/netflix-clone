import useCurrentUser from "../hooks/useCurrentUser";
import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";
import Navbar from "../components/navbar";
import Billboard from "../components/billboard";
import MovieList from "../components/movie-list";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "../hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favorites} />
      </div>
    </>
  );
}