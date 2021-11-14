export async function fetchAsahiData() {
  const asahi = await fetch(
    "https://lz16rqcbei.execute-api.us-east-1.amazonaws.com/default/fetchAsahiData",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY2,
      },
    }
  );
  const aData = await asahi.json();
  const asahiData = aData.Items;
  return asahiData;
}

export async function fetchYomiuriData() {
  const yomiuri = await fetch(
    "https://8rvpib53gd.execute-api.us-east-1.amazonaws.com/default/fetchYomiuriData",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY,
      },
    }
  );
  const ydata = await yomiuri.json();
  const yomiuriData = ydata.Items;
  return yomiuriData;
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
  return mainichiData;
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
  const sankeiData = sData.Items;
  return sankeiData;
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
  return nikkeiData;
}
