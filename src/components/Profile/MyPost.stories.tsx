import React from "react";

import { MyPosts } from "./MyPost";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/MyPost",
  component: MyPosts,
};

const Template = () => <MyPosts />;

export const Default = Template.bind({});
