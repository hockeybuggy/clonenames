import React, { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";

import { createReduxStore } from "./state/store";

type AllTheProvidersProps = {
  props: {
    children: ReactNode;
  };
};

const AllTheProviders: React.FC<AllTheProvidersProps> = ({
  children,
}): ReactElement => {
  const store = createReduxStore();
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

const customRender = (ui: ReactElement, options: any = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
