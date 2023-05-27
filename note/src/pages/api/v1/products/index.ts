import { Product, getProducts } from "@/service/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Product[]>
) {
  if (request.method === "GET") {
    const products = await getProducts();
    return response.status(200).json(products);
  }
  response.status(200);
}
