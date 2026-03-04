import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useUser from "./useUser";
import { db } from "../api/firebase";
import { useState } from "react";

export default function useWishGames() {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // const toggleWishGame = async (gameId) => {
  //   if (!user.uid) return;
  //   setIsLoading(true);

  //   try {
  //     const userRef = doc(db, "users", user.uid);
  //     const wishGames = user.wishGames || [];
  //     const isWishedGame = wishGames.includes(gameId);

  //     if (isWishedGame) {
  //       await updateDoc(userRef, {
  //         wishGames: arrayRemove(gameId),
  //       });
  //     } else {
  //       await updateDoc(userRef, {
  //         wishGames: arrayUnion(gameId),
  //       });
  //     }
  //   } catch (error) {
  //     console.log("wish 실패", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const toggleWishGame = (gameId) => {
    setUser((prev) => {
      const wishGames = prev.wishGames || [];
      const isWishedGame = wishGames.includes(gameId);

      return {
        ...prev,
        wishGames: isWishedGame
          ? wishGames.filter((id) => id !== gameId)
          : [...wishGames, gameId],
      };
    });
  };
  return { toggleWishGame, isLoading };
}
