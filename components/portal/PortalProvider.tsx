"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface PortalContextType {
  isPaid: boolean;
  user: any;
  profile: any;
  loading: boolean;
}

const PortalContext = createContext<PortalContextType>({
  isPaid: false,
  user: null,
  profile: null,
  loading: true,
});

export const usePortal = () => useContext(PortalContext);

export default function PortalProvider({ 
  children,
  initialUser,
  initialIsPaid 
}: { 
  children: React.ReactNode;
  initialUser: any;
  initialIsPaid: boolean;
}) {
  const [user, setUser] = useState(initialUser);
  const [isPaid, setIsPaid] = useState(initialIsPaid);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchDetails() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfile(data);
          // If the profile says they are paid, or if they are the admin, they have paid access
          const allowedEmails = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
          setIsPaid(data.is_paid || allowedEmails.includes(user.email?.toLowerCase() || ""));
        }
      } catch (e) {
        console.error("PortalProvider fetch error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [user, supabase]);

  return (
    <PortalContext.Provider value={{ isPaid, user, profile, loading }}>
      {children}
    </PortalContext.Provider>
  );
}
