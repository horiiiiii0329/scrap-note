import React from "react";

import PostContent from "./PostContent";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Post",
  component: PostContent,
};

const Template = () => <PostContent />;

export const Default = Template.bind({});
