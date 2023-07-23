export function handleError(res: any, message: string, params?: any) {
  console.log("error", { message, params });
  res.status(500).json({ error: message });
}
