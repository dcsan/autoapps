import { postData } from "./apiLib";
import { Fusion, User } from "./types";

export const initFusionApi = async (
  user: User,
  setterFunc?: any
): Promise<Fusion | null> => {
  try {
    const uri = `/api/fusion/init/${user.id}`;
    const response = await fetch(uri);
    const json = await response.json();
    console.log({ uri, json });
    setterFunc && setterFunc(json.data);
    return json.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const doFusionApi = async (fusion: Fusion): Promise<Fusion | null> => {
  const uri = `/api/fusion/do`;
  const data = await postData(uri, fusion);
  console.log({ uri, data });
  return data;
};
