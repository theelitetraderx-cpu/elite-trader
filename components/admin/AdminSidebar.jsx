"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, Video, LogOut, ChevronLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Course Manager", href: "/admin/courses", icon: Video },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#050505] border-r border-white/5 hidden lg:flex flex-col z-50">
      <div className="p-6">
        <Link href="/" className="inline-block group mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-tighter">
             Elite<span className="text-gold-500">Admin</span>
          </h2>
        </Link>

        {/* Back to main site */}
        <button 
           onClick={() => router.push('/dashboard')}
           className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all mb-8 text-sm uppercase font-bold tracking-widest"
        >
           <ArrowLeft size={16} /> Exit Admin
        </button>

        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-gold-500/10 to-transparent border-l-2 border-gold-500 text-gold-500' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <Icon size={18} />
                <span className="font-bold text-[13px] uppercase tracking-widest">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
             SP
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase">System Admin</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Master Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
