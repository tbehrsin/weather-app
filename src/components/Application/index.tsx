
import React from "react";

import SearchBox from "../SearchBox";
import Weather from "../Weather";

class Application extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        <h1>24 hours weather forecast</h1>
        <SearchBox placeholder="Search a city" />
        <Weather />
      </>
    );
  }
}

export default Application;
