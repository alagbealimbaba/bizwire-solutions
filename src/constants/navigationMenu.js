export const PORTFOLIO_ITEMS = [
  "Cooperative Management",
  "Pension & Gratuity Management",
  "Business Impact Analysis",
  "Risk Management",
  "Project Portfolio Management",
  "Human Resources/Payroll",
  "Membership Management",
  "Product Distribution Visibility",
];

const PORTFOLIO_SUB_LINKS = Object.fromEntries(
  PORTFOLIO_ITEMS.map((item) => [item, "/pagenotavailable"])
);

export const menuLinks = {
  Home: { link: "/home" },
  Company: { link: "/about" },
  "Tech Services": { link: "/information-services" },
  Consulting: { link: "/services" },
  Portfolio: {
    link: "/pagenotavailable",
    items: PORTFOLIO_ITEMS,
    subLinks: PORTFOLIO_SUB_LINKS,
  },
  Blog: { link: "/blog" },
};
