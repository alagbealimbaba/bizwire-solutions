/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLocation } from "react-router-dom";

export const BreadCrumbs = () => {
  const location = useLocation();

  let currentLink = [];
  const routeParts = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "");

  const crumbs = routeParts.map((crumb) => {
    currentLink += `/${crumb}`;
    const decodedCrumb = decodeURIComponent(crumb);
    return (
      <div className="crumb" key={crumb}>
        <Link to={currentLink}>{decodedCrumb}</Link>
      </div>
    );
  });
  const currentRoute = routeParts[routeParts.length - 1];
  const decodedCurrentRoute = decodeURIComponent(currentRoute);

  return (
    <div className="breadcrumbs">
      <h1 className="breadcrumb-heading">{decodedCurrentRoute}</h1>
      <div className="crumbs">
      {crumbs}
      </div>
    </div>
  );
};
