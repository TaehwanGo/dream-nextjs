import type { NextApiRequest, NextApiResponse } from "next";

// app/api/hello1.ts 은 아직 지원이 안되는 것 같다
export async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json({ name: "John Doe in app/api/hello" });
}
