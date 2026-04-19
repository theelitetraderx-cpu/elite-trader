import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Checking profiles table...");
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*').limit(1);
  if (pError) {
    console.error("Profiles error:", pError.message);
  } else {
    console.log("Profiles found. Sample:", profiles);
  }

  console.log("\nChecking payments table...");
  const { data: payments, error: payError } = await supabase.from('payments').select('*').limit(1);
  if (payError) {
    console.error("Payments error:", payError.message);
  } else {
    console.log("Payments found. Sample:", payments);
  }
}

checkSchema();
