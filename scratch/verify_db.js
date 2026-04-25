import { supabaseAdmin } from './utils/supabase/admin.js';

async function verifyTable() {
    console.log("Verifying pending_users table...");
    const { data, error } = await supabaseAdmin
        .from('pending_users')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error fetching from pending_users:", error);
    } else {
        console.log("Success! Columns in table:", data[0] ? Object.keys(data[0]) : "Table is empty, but query worked.");
    }
}

// verifyTable(); // Uncomment to run
