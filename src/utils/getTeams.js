import { logoMap } from "../constants/logoMap";

export function getTeams(game) {
  const isFinished = game.status === "종료";

  const teams = game.home
    ? {
        left: {
          name: game.opponent,
          logo: logoMap[game.opponent],
          ...(isFinished && { score: game.score.opponentScore }),
        },
        right: {
          name: "두산",
          logo: "doosan",
          ...(isFinished && { score: game.score.doosanScore }),
        },
      }
    : {
        left: {
          name: "두산",
          logo: "doosan",
          ...(isFinished && { score: game.score.doosanScore }),
        },
        right: {
          name: game.opponent,
          logo: logoMap[game.opponent],
          ...(isFinished && { score: game.score.opponentScore }),
        },
      };

  return teams;
}
