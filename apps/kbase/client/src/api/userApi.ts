export const fetchUsers = async (setterFunc: any) => {
  try {
    const response = await fetch("/api/users");
    const json = await response.json();
    console.log("fetchUsers", json);
    setterFunc(json);
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const fetchOneUser = async (userId?: string, setFunc?: any) => {
  if (!userId) {
    console.warn("fetchOneUser: userId is not defined");
    return { success: false };
  }
  const uri = `/api/user/${userId}`;
  console.log("fetchOneUser", { uri });
  try {
    const response = await fetch(uri);
    const json = await response.json();
    console.log("fetchOneUser res.json=>", json);
    setFunc && setFunc(json.data);
    return { success: true, data: json };
  } catch (error) {
    console.error(`fetchOneUser error ${uri}`, error);
    return { success: false };
  }
};
