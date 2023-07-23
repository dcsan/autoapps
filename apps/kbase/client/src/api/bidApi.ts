// type IBidResult = {
//   success: boolean;
//   data?: IBid[];
// }

import { IBidResult } from "./types";

export const fetchBids = async (
  auctionId: number,
  setterFunc?: any
): Promise<IBidResult> => {
  const url = `/api/bids/${auctionId}`;
  console.log("fetchBids", url);
  try {
    const response = await fetch(url);
    const json = (await response.json()) as IBidResult;

    // .then((result: { data: IBid[] }) => {
    //   console.log('fetchBids =>', { result })
    //   setBids({ bids: result.data })
    //   console.log('BidList useEffect', result.data)

    if (setterFunc) setterFunc(json?.data?.bids);
    // FIXME - create struct server side
    console.log("makeBid => ", { url, json });
    return json;
  } catch (error) {
    console.error("fetchBids", error);
    return {
      success: false,
      data: {
        bids: [],
      },
    };
  }
};

export const makeBid = async (
  amount: number,
  login: any,
  auction: any,
  setterFunc: any
): Promise<IBidResult> => {
  const url = `/api/bid`;
  const userId = login?.id;
  if (!userId) {
    console.log("makeBid - no user");
    return { success: false };
  }

  const data = {
    auctionId: auction.id,
    userId,
    amount,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log("makeBid =>", { url, data, json });
    // a bit tricky we pluck this value out
    setterFunc(json?.data?.bids);
    return json;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
