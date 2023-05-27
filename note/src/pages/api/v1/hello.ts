import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  response.status(200).json({ name: "John Doe" });
}
