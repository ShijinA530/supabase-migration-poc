import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
import mime from "mime-types";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

const PROJECT_URL = SUPABASE_URL;

function getPublicUrl(bucket, path) {
  return `${PROJECT_URL}/storage/v1/object/public/${bucket}/${path}`;
}

async function uploadFile(bucket, filePath, destPath) {
  const file = fs.readFileSync(filePath);

  // Detect MIME type
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${bucket}/${destPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE}`,
        "Content-Type": contentType, // ✅ FIXED
      },
      body: file,
    }
  );

  if (!res.ok) {
    console.error(`❌ Failed: ${destPath}`, await res.text());
  } else {
    console.log(`✅ Uploaded: ${destPath} (${contentType})`);
  }
}

// Example uploads
async function run() {
  await uploadFile(
    "general",
    "./assets/Sample CSV/prayer_times&offsets.csv",
    "sample-csv/prayer_times&offsets.csv"
  );

  const url = getPublicUrl("general", "sample-csv/prayer_times&offsets.csv");

  console.log("📌 SAMPLE CSV URL:");
  console.log(url);

//   Theme background images
  // Theme 1
  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/Theme 1/Theme1_light.png",
    "Theme 1/Theme1_light.png"
  );

  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/Theme 1/Theme1_dark.jpg",
    "Theme 1/Theme1_dark.jpg"
  );

  // Theme 2
  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/Theme 2/Theme2_light.jpg",
    "Theme 2/Theme2_light.jpg"
  );

  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/Theme 2/Theme2_dark.jpg",
    "Theme 2/Theme2_dark.jpg"
  );

//   Theme 3
  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/Theme 3/Theme3_light&dark.jpg",
    "Theme 3/Theme3_light&dark.jpg"
  );

//   UD
  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/UD/ud1.png",
    "UD/ud1.png"
  );

  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/UD/ud2.png",
    "UD/ud2.png"
  );

  await uploadFile(
    "theme-background-images",
    "./assets/Theme background images/UD/ud3.png",
    "UD/ud3.png"
  );

//   Theme display images
  //   Prayerhall
  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/Prayerhall/Prayerhall-1.png",
    "Prayerhall/Prayerhall-1.png"
  );

  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/Prayerhall/Prayerhall-2.png",
    "Prayerhall/Prayerhall-2.png"
  );

  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/Prayerhall/Prayerhall-3.png",
    "Prayerhall/Prayerhall-3.png"
  );

  //   Lobby
  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/Lobby/Lobby-1.png",
    "Lobby/Lobby-1.png"
  );

  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/Lobby/Lobby-2.png",
    "Lobby/Lobby-2.png"
  );

  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/Lobby/Lobby-3.png",
    "Lobby/Lobby-3.png"
  );

  //   UD
  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/UD/UD-1.png",
    "UD/UD-1.png"
  );

  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/UD/UD-2.png",
    "UD/UD-2.png"
  );

  await uploadFile(
    "theme-display-images",
    "./assets/Theme display images/UD/UD-3.png",
    "UD/UD-3.png"
  );

  // 📌 DEFAULT MEDIA (mosques bucket)
    const DEFAULT_MEDIA_PATH = "982842840/multimedia/default.png";

    await uploadFile(
        "mosques",
        "./assets/default-media/default.png", // local file
        DEFAULT_MEDIA_PATH
    );

    const defaultMediaUrl = getPublicUrl("mosques", DEFAULT_MEDIA_PATH);

    console.log("📌 DEFAULT MEDIA URL:");
    console.log(defaultMediaUrl);
}

run();