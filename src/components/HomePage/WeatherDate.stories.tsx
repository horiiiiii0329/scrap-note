import React from "react";

import WeatherDate from "./WeatherDate";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/WeatherDate",
  component: WeatherDate,
};

const Template = () => <WeatherDate />;

export const Default = Template.bind({});
