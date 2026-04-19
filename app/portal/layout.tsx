import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Note: the PortalProvider is now at the root level (app/layout.tsx)
  // so all pages have access to portal state automatically.
  
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
       {children}
    </div>
  );
}
