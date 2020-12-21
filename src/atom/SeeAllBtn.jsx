import React from "react";
import { Link } from "react-router-dom";
import { HeadingText } from "./Headings";

export const SeeAllBtn = React.memo(({ classes, children, to, ...props }) => {
  return (
    <Link
      to={to}
      className={`rounded-full text-gray-200 bg-blue-900 shadow-xl px-3 md:px-4 py-1 md:py-2 flex items-center ${classes}`}
      {...props}
    >
      <i className="fas fa-angle-double-right mr-2 text-red-600"></i>
      <HeadingText>{children ? children : "Տեսնել Ավելին"}</HeadingText>
    </Link>
  );
});