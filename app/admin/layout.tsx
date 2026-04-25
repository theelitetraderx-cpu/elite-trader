import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Await the cookies() function in next 15/canary
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();

  const allowedAdmins = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
  if (!user || !allowedAdmins.includes(user.email?.toLowerCase() || "")) {
    redirect("/dashboard");
  }

  return (
    <div className="flex bg-black min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto w-full custom-scrollbar pt-16 lg:pt-0 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
         {children}
        </div>
      </main>
    </div>
  );
}
