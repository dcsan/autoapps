import { AuctionResult } from "./types";

export const fetchOneAuction = async (
  id: string,
  setterFn: any,
  setLoading: any // when OK
) => {
  try {
    const response = await fetch(`/api/auction/${id}`);
    const json = await response.json();
    setterFn(json);
    setLoading(false);
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const fetchAuctions = async (setterFunc: any) => {
  try {
    const response = await fetch("/api/auctions/all");
    const json = await response.json();
    setterFunc(json);
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const resetAuctionTime = async (
  id: string,
  setAuction: any
): Promise<AuctionResult> => {
  const uri = `/api/auction/${id}/reset`;
  try {
    const response = await fetch(uri, {
      method: "POST",
    });
    const json = await response.json();
    setAuction(json);
    return json as AuctionResult;
  } catch (error) {
    console.error(uri, error);
    return { success: false };
  }
};
