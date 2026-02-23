import useUser from "./useUser";

export default function useWishGames() {
  const { user, setUser } = useUser();
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
  return { toggleWishGame };
}
