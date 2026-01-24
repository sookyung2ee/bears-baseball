import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname 대체 (ESM 필수 패턴)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 파일 직접 읽기 (assert 안 씀 → 제일 안정적)
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "firebase-admin-key.json"), "utf-8"),
);

const schedule = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../public/data/doosanScheduleFinal.json"),
    "utf-8",
  ),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function upload() {
  const batch = db.batch();

  schedule.forEach((game) => {
    const ref = db.collection("games").doc(String(game.gameId));
    batch.set(ref, game);
  });

  await batch.commit();
  console.log("🔥 스케줄 업로드 완료!");
}

upload().catch(console.error);
