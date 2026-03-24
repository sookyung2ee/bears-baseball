import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";

const resultMap = { end: "종료", cancel: "취소", scheduled: "경기전" };

export default function useGameStatusManager() {
  const updateGameResult = async (form) => {
    try {
      const gameRef = doc(db, "games", form.gameId);

      let updateData = {
        status: resultMap[form.status],
      };

      if (form.status === "end") {
        updateData.score = form.score;
        updateData.resultText = form.resultText;
      } else {
        updateData.score = deleteField();
        updateData.resultText = deleteField();
      }

      await updateDoc(gameRef, updateData);

      console.log("✅ 경기 상태 업데이트 성공");
    } catch (error) {
      console.error("🔥 업데이트 실패", error);
    }
  };

  return { updateGameResult };
}
