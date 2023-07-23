export async function postData(
  url = "",
  data = {},
  method = "POST"
): Promise<any> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    // TODO - throw?
    console.error(url, error);
    return null;
  }
}
