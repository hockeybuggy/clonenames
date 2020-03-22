import React from "react";
import { RouteProps } from "react-router";

import CreateGameControls from "../components/CreateGameControls";
import Layout from "../components/Layout";

type LandingPageProps = { props: {} };

const LandingPage: React.FC<LandingPageProps & RouteProps> = ({}) => {
  return (
    <Layout>
      <div>
        <h1>Clonenames</h1>
        <CreateGameControls />
      </div>
    </Layout>
  );
};
export default LandingPage;
