import React from "react";
import { RouteProps } from "react-router";

import CreateGameControls from "../components/CreateGameControls";

type LandingPageProps = { props: {} };

const LandingPage: React.FC<LandingPageProps & RouteProps> = ({}) => {
  return (
    <>
      <div>Landing</div>
      <CreateGameControls />
    </>
  );
};
export default LandingPage;
