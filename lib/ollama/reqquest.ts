export async function request(url: string, ops?: Parameters<typeof fetch>[1]) {
  return await fetch(`${process.env.BASE_URL}${url}`, ops);
}
