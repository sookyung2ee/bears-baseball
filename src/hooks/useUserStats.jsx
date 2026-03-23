import useGamesSchedule from "./usegamesSchedule";
import useUser from "./useUser";

export default function useUserStats() {
  const { user } = useUser();
  const { games } = useGamesSchedule();

  const winningRate = (type, year) => {
    console.log(year);
    if (
      !user ||
      !user.records?.[type] ||
      !games?.length ||
      user.records[type].length === 0
    )
      return 0;

    const records = user.records[type];
    const recordsGameId = records.map((record) => record.gameId);
    const gameInfoArr = games.filter((game) =>
      recordsGameId.includes(game.gameId),
    );
    const winNum = gameInfoArr.filter(
      (game) => game.resultText === "win",
    ).length;
    const rate = ((winNum / gameInfoArr.length) * 100).toFixed(1);

    return rate;
  };
  return { winningRate };
}
