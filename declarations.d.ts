namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    API_GATEWAY_APIKEY: string;
    API_GATEWAY_APIKEY2: string;
    API_GATEWAY_APIKEY3: string;
    API_GATEWAY_APIKEY4: string;
    API_GATEWAY_APIKEY5: string;
  }
}

declare module "react-responsive-masonry" {
  import * as React from "react";

  const Masonry: React.FC<{
    columnsCount?: number;
    gutter?: string;
  }>;

  export const ResponsiveMasonry: React.FC<{
    columnsCountBreakPoints?: Record<number, number>;
  }>;

  export default Masonry;
}
