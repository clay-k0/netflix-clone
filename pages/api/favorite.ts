import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "../../lib/prismadb";
import serverAuth from "../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
    } else if (req.method === "PUT") {
      const { currentUser } = await serverAuth(req, res);

      const { movieId, favorite } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = favorite
        ? [...currentUser.favoriteIds, movieId]
        : without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    } else if (req.method === "DELETE") {
    } else {
      return res.status(405).end();
    }
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
