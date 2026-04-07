import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import AdmZip from "adm-zip";
import { createClient } from "@supabase/supabase-js";

// 🔐 ENV
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// 📦 ZIP FILE PATH
const ZIP_PATH = "./data/JSON_2026_North.zip"; // <-- change this

// ⏱ Convert HH:mm → HH:mm:ss
function formatTime(t) {
  if (!t) return null;
  if (t.length === 5) return t + ":00";
  return t;
}

// 🔢 Convert to number
function toNumber(val) {
  if (val === null || val === undefined) return null;
  return Number(val);
}

// 🧠 Transform data
function transform(row) {
  return {
    date: row.date,
    location_iso: row.district_code || row.location_iso,
    kommune: row.kommune || null,
    prayer_method: 1,

    fajr: formatTime(row.fajr),
    duhr: formatTime(row.duhr),
    asr: formatTime(row.asr),
    shadow_1x: formatTime(row.shadow_1x),
    shadow_2x: formatTime(row.shadow_2x),
    wusta_noon_sunset: formatTime(row.wusta_noon_sunset),
    maghrib: formatTime(row.maghrib),
    isha: formatTime(row.isha),
    istiwa_noon: formatTime(row.istiwa_noon),
    muntasafallayl_midnight: formatTime(row.muntasafallayl_midnight),
    ghrub_sunset: formatTime(row.ghrub_sunset),
    shuruq_sunrise: formatTime(row.shuruq_sunrise),

    laylat_falakia_two3rd: formatTime(row.laylat_falakia_two3rd),
    laylatal_shariea_two3rd: formatTime(row.laylatal_shariea_two3rd),
    laylat_falakia_one3rd: formatTime(row.laylat_falakia_one3rd),
    laylatal_shariea_one3rd: formatTime(row.laylatal_shariea_one3rd),

    fajr_endtime: formatTime(row.fajr_endtime),
    shafaqal_ahmar_end_redlight: formatTime(row.shafaqal_ahmar_end_redlight),
    shafaqal_abyadh_end_whitelight: formatTime(row.shafaqal_abyadh_end_whitelight),

    fajr_sadiq: formatTime(row.fajr_sadiq),
    prayer_after_sunrise: formatTime(row.prayer_after_sunrise),
    asr_endtime: formatTime(row.asr_endtime),

    altitude_noon: toNumber(row.altitude_noon),
    altitude_midnight: toNumber(row.altitude_midnight),

    sun_shadow_noon: toNumber(row.sun_shadow_noon),
    sun_shadow_wusta: toNumber(row.sun_shadow_wusta),

    elevation_noon: toNumber(row.elevation_noon),
    elevation_midnight: toNumber(row.elevation_midnight),
    elevation_asrwusta: toNumber(row.elevation_asrwusta),
    elevation_shadow_1x: toNumber(row.elevation_shadow_1x),
    elevation_shadow_2x: toNumber(row.elevation_shadow_2x),
  };
}

// 🚀 Insert batch
async function insertBatch(rows, count) {
  const { data, error } = await supabase
    .from("prayertime")
    .upsert(rows, {
      onConflict: "date,location_iso,prayer_method",
    })
    .select(); // 👈 important for debugging

  if (error) {
    console.error(`❌ Batch ${count} failed`);
    console.error("👉 Error message:", error.message);
    console.error("👉 Error details:", error.details);
    console.error("👉 Error hint:", error.hint);
    console.error("👉 Error code:", error.code);
  } else {
    console.log(`✅ Batch ${count}: Inserted ${rows.length} rows`);
  }
}

// 📦 MAIN
async function run() {
  console.log("📦 Reading ZIP...");

  const zip = new AdmZip(ZIP_PATH);
  const entries = zip.getEntries();

  let batch = [];
  let batchCount = 1;
  let total = 0;

  for (const entry of entries) {
    // Skip folders
    if (entry.isDirectory) continue;

    // Only JSON files
    if (!entry.entryName.endsWith(".json")) continue;

    console.log(`📄 Processing: ${entry.entryName}`);

    const content = entry.getData().toString("utf8");

    let json;
    try {
      json = JSON.parse(content);
    } catch (err) {
      console.error("❌ Invalid JSON:", entry.entryName);
      continue;
    }

    for (const row of json) {
      const transformed = transform(row);
      batch.push(transformed);
      total++;

      // Insert every 500 rows
      if (batch.length >= 500) {
        await insertBatch(batch, batchCount++);
        batch = [];
      }
    }
  }

  // Remaining rows
  if (batch.length > 0) {
    await insertBatch(batch, batchCount++);
  }

  console.log(`🎉 DONE! Total rows processed: ${total}`);
}

run();