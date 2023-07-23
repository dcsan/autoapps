export const resetDb = async (appId: string, setterFunc?: any) => {
  try {
    const uri = `/api/reset/${appId}`;
    const response = await fetch(uri);
    const json = await response.json();
    console.log("api/reset", json);
    setterFunc && setterFunc(json);
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
