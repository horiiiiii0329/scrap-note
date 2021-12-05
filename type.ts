import { Extension } from "@tiptap/core";

export interface CustomExtensionOptions {
  awesomeness: number;
}

const CustomExtension = Extension.create<CustomExtensionOptions>({
  addOptions() {
    return {
      awesomeness: 100,
    };
  },
});

export interface CustomExtensionStorage {
  awesomeness: number;
}

export interface IWeatherCard {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys?: {
    pod: string;
  };
  dt_txt: string;
}

export interface NewsList {
  id: string;
  insertat: string;
  headline: string;
  link: string;
  title: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customExtension: {
      /**
       * Comments will be added to the autocomplete.
       */
      yourCommand: (someProp: any) => ReturnType;
    };
  }
}
