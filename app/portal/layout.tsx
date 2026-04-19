import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PortalProvider from "@/components/portal/PortalProvider";

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

  // ALLOWED EMAILS: Only specified users can access the portal for now
  const allowedEmails = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
  if (!allowedEmails.includes(user.email?.toLowerCase() || "")) {
    redirect("/dashboard"); // Or a custom 403 page
  }

  // Check user profile for is_paid status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_paid')
    .eq('id', user.id)
    .single();
  
  const isPaid = profile?.is_paid || allowedEmails.includes(user.email?.toLowerCase() || "");
  
  return (
    <PortalProvider initialUser={user} initialIsPaid={isPaid}>
      <div className="bg-[#0a0a0a] min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
         {children}
      </div>
    </PortalProvider>
  );
}
