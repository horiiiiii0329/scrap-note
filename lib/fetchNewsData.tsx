export async function fetchAsahiData() {
  const asahi = await fetch(
    "https://lm8gbiweyk.execute-api.us-east-1.amazonaws.com/default/fetchAsahiData",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY2,
      },
    }
  );
  const aData = await asahi.json();
  const asahiData = aData.Items;
}

export async function fetchYomiuriData() {
  const yomiuri = await fetch(
    "https://erzss0zhpd.execute-api.us-east-1.amazonaws.com/default/fetchYomiuriData",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY,
      }:
    }
  );
  const ydata = await yomiuri.json();
  const yomiuriData = ydata.Items;
}

export async function fetchMainichiData() {
  const mainichi = await fetch(
    "https://tyuz1jflm6.execute-api.us-east-1.amazonaws.com/default/fetchMainichi",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY4,
      },
    }
  );
  const mData = await mainichi.json();
  const mainichiData = mData.Items;
}

export async function fetchSankeiData() {
  const sankei = await fetch(
    "https://729w81osh5.execute-api.us-east-1.amazonaws.com/default/fetchSankei",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY3,
      },
    }
  );
  const sData = await sankei.json();
  sankeiData = sData.Items;
}

export async function fetchNikkeiData() {
  const nikkei = await fetch(
    " https://ljmgodfzp8.execute-api.us-east-1.amazonaws.com/default/nikkeiData",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY5,
      },
    }
  );
  const nData = await nikkei.json();
  const nikkeiData = nData.Items;
}
