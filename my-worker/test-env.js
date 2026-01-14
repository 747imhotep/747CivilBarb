import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// 1️⃣ Charger les variables d'environnement
dotenv.config();

// 2️⃣ Tester qu'une variable est bien chargée
console.log("R2_BUCKET_NAME:", process.env.R2_BUCKET_NAME);

// 3️⃣ Chemin du fichier entitlements
const ENTITLEMENTS_PATH = path.join(process.cwd(), "data", "entitlements.json");
console.log("Entitlements file:", ENTITLEMENTS_PATH);

// 4️⃣ Lire le fichier si existant
let entitlements = {};
if (fs.existsSync(ENTITLEMENTS_PATH)) {
  entitlements = JSON.parse(fs.readFileSync(ENTITLEMENTS_PATH, "utf-8"));
}

// 5️⃣ Fonction pour accorder un accès premium
function grantEntitlement(customerId, email) {
  entitlements[customerId] = {
    email,
    status: "active",
    plan: "premium",
    since: new Date().toISOString().split("T")[0]
  };

  fs.writeFileSync(
    ENTITLEMENTS_PATH,
    JSON.stringify(entitlements, null, 2)
  );
    console.log(`✅ Entitlement granted for ${email} (${customerId})`);
}

// 6️⃣ Test: créer un client fictif
if (process.env.TEST_ENTITLEMENT === "true") {
  grantEntitlement("cus_TEST12345", "test@example.com");

  // Afficher le fichier complet pour vérifier
  console.log("Current entitlements:", entitlements);
}
