import React from "react";
import LoadingComponent from "../components/Loading";

interface ComponentOrLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

function ComponentOrLoading(props: ComponentOrLoadingProps) {
  const { isLoading, children } = props;
  return isLoading ? <LoadingComponent /> : <>{children}</>;
}

export default ComponentOrLoading;
