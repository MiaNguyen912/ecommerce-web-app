"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useScreenType } from "@/hooks/useScreenType";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setShowMenu, setShowSearch, setIsMounted } from "@/store/features/appSlice";
import { Menu as MenuComponent } from "./menu";

export function Header() {
  const dispatch = useAppDispatch();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [isDesktop, isTablet, isMobile] = useScreenType();
  const { theme, setTheme, systemTheme } = useTheme();

  // Get state from Redux
  const showMenu = useAppSelector((state) => state.app.showMenu);
  const showSearch = useAppSelector((state) => state.app.showSearch);
  const isMounted = useAppSelector((state) => state.app.isMounted);

  useEffect(() => {
    dispatch(setIsMounted(true)); // prevent hydration error
  }, [dispatch]);

  if (!isMounted) return null; // prevent hydration error

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 border-b-black border-b-[1px]">
      <div className="mx-auto">
        {/* Desktop navigation */}
        {isDesktop ? (
          <div className="h-20 flex items-center justify-between px-20">

            {/* Home */}
            <Link href="/home">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="Home">
                <Home className="h-5 w-5" />
              </Button>
            </Link>

            {/* Menu */}
            <Button variant="ghost" size="icon" onClick={() => dispatch(setShowMenu(!showMenu))} className="relative border-none hover:bg-transparent hover:font-bold text-sm">
              MENU
            </Button>

            {/* New */}
            <Link href="/new">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="New">
                NEW
              </Button>
            </Link>

            {/* Search Toggle */}
            <Button variant="ghost" size="icon" onClick={() => dispatch(setShowSearch(!showSearch))} className="relative border-none hover:bg-transparent hover:font-bold text-sm" aria-label="Search">
              SEARCH
            </Button>

            {/* Logo */}
            <Link href="/home" className="font-bold text-xl tracking-widest w-[40%]">
              <Image src="/svg/logo.svg" alt="Logo" width={0} height={0} className="h-10 mx-auto my-6 w-fit" />
            </Link>

            {/* log in */}
            <Link href="/login">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="Login">
                LOGIN
              </Button>
            </Link>

            {/* Help */}
            <Link href="/help">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="Help">
                HELP
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="Cart">
                CART [{itemCount}]
              </Button>
            </Link>
          </div>
        ) : (
          // mobile navigation
          <div className="h-16 flex items-center justify-between w-full px-4">
            {/* Logo */}
            <Link href="/home" className="font-bold text-xl tracking-widest">
              <Image src="/svg/logo.svg" alt="Logo" width={0} height={0} className="h-10 mx-auto my-6 w-fit" />
            </Link>

            <div className="flex items-center space-x-4">
              {/* Search Toggle */}
              <Button variant="ghost" size="icon" onClick={() => dispatch(setShowSearch(!showSearch))} className="relative border-none hover:bg-transparent hover:font-bold" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </Link>

              {/* Menu */}
              <Button variant="ghost" size="icon" onClick={() => dispatch(setShowMenu(!showMenu))} className="relative border-none hover:bg-transparent hover:font-bold">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Menu Component */}
        <MenuComponent />

        {/* Search Bar */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showSearch ? "h-16 opacity-100 mb-4" : "h-0 opacity-0"}`}>
          <div className="py-4 flex items-center w-[30%] mx-auto">
            <Search className="h-5 w-5 mr-2 text-gray-400" />
            <Input placeholder="Search products..." className="border-0 focus-visible:ring-0 bg-transparent text-sm" autoFocus={showSearch} />
            <Button variant="ghost" size="sm" onClick={() => dispatch(setShowSearch(false))}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
