import React from "react";
import { RouteProps } from "react-router";

import CreateGameControls from "../components/CreateGameControls";
import Layout from "../components/Layout";

type LandingPageProps = { props: {} };

const LandingPage: React.FC<LandingPageProps & RouteProps> = ({}) => {
  return (
    <Layout>
      <h1>Clonenames</h1>
      <CreateGameControls />
    </Layout>
  );
};
export default LandingPage;
