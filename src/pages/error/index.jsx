import { ArrowBigLeft, HomeIcon } from "lucide-react";
import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>uh oh! you got an error:;</h1>
      <h3>{error.message || error.statusText}</h3>
      <div className="flex gap-5">
        <div className="capitalize">
          <ArrowBigLeft />
          go back{" "}
        </div>
        <div className="capitalize">
          <HomeIcon />
          go home
        </div>
      </div>
    </div>
  );
};

export default Error;
