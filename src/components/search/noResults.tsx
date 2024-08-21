import React from "react";
import { Button, Empty, Result } from "antd";
const NoResults = () => {
  return (
    <div className="">
      <Result
        style={{ padding: "12px 12px" }}
        status="404"
        title="Sorry, no results found!"
        subTitle=" Try searching with different keywords or try searching for something else!"
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

export default NoResults;
