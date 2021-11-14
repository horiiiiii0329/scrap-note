import React from "react";
import Row from "./Row";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Row",
  component: Row,
};

const Template = () => <Row companyname="朝日新聞" />;

export const Default = Template.bind({});
