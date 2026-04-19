"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface PortalContextType {
  isPaid: boolean;
  isAuthorized: boolean;
  user: any;
  profile: any;
  loading: boolean;
}

const PortalContext = createContext<PortalContextType>({
  isPaid: false,
  isAuthorized: false,
  user: null,
  profile: null,
  loading: true,
});

export const usePortal = () => useContext(PortalContext);

export default function PortalProvider({ 
  children,
  initialUser,
  initialIsPaid,
  initialIsAuthorized
}: { 
  children: React.ReactNode;
  initialUser: any;
  initialIsPaid: boolean;
  initialIsAuthorized: boolean;
}) {
  const [user, setUser] = useState(initialUser);
  const [isPaid, setIsPaid] = useState(initialIsPaid);
  const [isAuthorized, setIsAuthorized] = useState(initialIsAuthorized);
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
          const allowedEmails = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
          const authorized = allowedEmails.includes(user.email?.toLowerCase() || "");
          setIsAuthorized(authorized);
          setIsPaid(data.is_paid || authorized);
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
    <PortalContext.Provider value={{ isPaid, isAuthorized, user, profile, loading }}>
      {children}
    </PortalContext.Provider>
  );
}
