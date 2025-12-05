import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import ConnectWallet from './ConnectWallet';
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-white/80 backdrop-blur-md border border-gray-200",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block bg-gray-100" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-gray-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      variant="bordered"
    />
  );

  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      className="backdrop-blur-md bg-white/70 border-b border-gray-200/50"
      classNames={{
        wrapper: "px-4 sm:px-6",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2 hover:opacity-80 transition-opacity" href="/home">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Logo className="text-white" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PicWe CCN
              </p>
              <p className="text-xs text-gray-500 hidden sm:block">Commodity Credit Network</p>
            </div>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-1 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all hover:bg-gray-100",
                  "data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-purple-500",
                  "data-[active=true]:text-white data-[active=true]:shadow-md",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link 
            isExternal 
            aria-label="Twitter" 
            href={siteConfig.links.twitter}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <TwitterIcon className="text-gray-600 hover:text-blue-500 transition-colors" />
          </Link>
          <Link 
            isExternal 
            aria-label="Discord" 
            href={siteConfig.links.discord}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <DiscordIcon className="text-gray-600 hover:text-purple-500 transition-colors" />
          </Link>
          <Link 
            isExternal 
            aria-label="Github" 
            href={siteConfig.links.github}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <GithubIcon className="text-gray-600 hover:text-gray-900 transition-colors" />
          </Link>
          <div className="p-2">
            <ThemeSwitch />
          </div>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <ConnectWallet />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link 
          isExternal 
          aria-label="Github" 
          href={siteConfig.links.github}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <GithubIcon className="text-gray-600" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="backdrop-blur-md bg-white/90">
        <div className="py-4">
          {searchInput}
        </div>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <NextLink
                className="w-full px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
