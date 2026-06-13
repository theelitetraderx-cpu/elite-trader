"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import "./PillNav.css";

const supabase = createClient();

const MAIN_NAV = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/#courses" },
  { label: "Community", href: "/community" },
  { label: "Signals", href: "/signals" },
  { label: "Contact", href: "/#contact" },
];

const AUTH_NAV = [{ label: "Dashboard", href: "/dashboard" }];

const PillNav = ({
  logo = "/logo.png",
  logoAlt = "The Elite Trader",
  className = "",
  initialLoadAnimation = true,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentHash, setCurrentHash] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const logoRef = useRef(null);
  const navPillRef = useRef(null);

  useEffect(() => {
    setCurrentHash(window.location.hash);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_OUT") {
        localStorage.removeItem("isLoggedIn");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    }).catch((err) => {
      console.error("Failed to get session:", err);
    });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initialLoadAnimation) return;

    const logo = logoRef.current;
    const navPill = navPillRef.current;

    if (logo) {
      gsap.fromTo(
        logo,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }

    if (navPill) {
      gsap.fromTo(
        navPill,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power3.out" }
      );
    }
  }, [initialLoadAnimation]);

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.8,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 5, duration: 0.35 });
        gsap.to(lines[1], { rotation: -45, y: -5, duration: 0.35 });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.35 });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.35 });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible", pointerEvents: "auto" });
        gsap.to(menu, { opacity: 1, duration: 0.4 });
      } else {
        gsap.to(menu, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden", pointerEvents: "none" });
          },
        });
      }
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem("isLoggedIn");
      window.dispatchEvent(new Event("auth-change"));
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const isActive = (href) => {
    if (!href) return false;
    if (href === "/") return pathname === "/" && !currentHash;
    if (href.startsWith("/#")) {
      return pathname === "/" && currentHash === href.slice(1);
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const userInitial =
    user?.user_metadata?.first_name?.[0] ||
    user?.user_metadata?.name?.[0] ||
    user?.email?.[0] ||
    "U";

  const userName =
    user?.user_metadata?.first_name ||
    user?.user_metadata?.name?.split(" ")[0] ||
    "Trader";

  const mobileLinks = user
    ? [...MAIN_NAV, ...AUTH_NAV]
    : MAIN_NAV;

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <div className={`pill-nav-container ${className}`}>
      <nav className="pill-nav" aria-label="Primary">
        <Link
          className="site-brand-logo"
          href="/"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </Link>

        <div className="pill-nav-center" ref={navPillRef}>
          <div className="nav-pill">
            <ul className="pill-list" role="menubar">
              {MAIN_NAV.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={`pill ${isActive(item.href) ? "is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pill-nav-auth">
          {user ? (
            <>
              {AUTH_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`auth-link ${isActive(item.href) ? "!text-gold-400" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="auth-user-pill">
                <span className="auth-user-avatar">{userInitial}</span>
                <span className="auth-user-name">{userName}</span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="auth-signout"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="auth-link">
                Log In
              </Link>
              <Link href="/register" className="auth-join-btn">
                Join
              </Link>
            </>
          )}
        </div>

        <div className="pill-nav-mobile">
          <button
            type="button"
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            ref={hamburgerRef}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div className="mobile-menu-popover" ref={mobileMenuRef}>
        <ul className="mobile-menu-list">
          {mobileLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`mobile-menu-link ${isActive(item.href) ? "is-active" : ""}`}
                onClick={() => toggleMobileMenu()}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mobile-auth-row">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  handleSignOut();
                  toggleMobileMenu();
                }}
                className="auth-link text-red-400"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="auth-link text-lg"
                  onClick={() => toggleMobileMenu()}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="auth-join-btn"
                  onClick={() => toggleMobileMenu()}
                >
                  Join
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
