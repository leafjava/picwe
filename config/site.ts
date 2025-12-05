export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PicWe CCN",
  description: "商品信用网络 - 全球大宗商品链上融资与结算平台",
  navItems: [
    {
      label: "首页",
      href: "/home",
    },
    {
      label: "商品管理",
      href: "/products",
    },
    {
      label: "融资申请",
      href: "/financing",
    },
    {
      label: "融资池",
      href: "/pools",
    },
    {
      label: "结算中心",
      href: "/settlement",
    },
    {
      label: "数据分析",
      href: "/analytics",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
