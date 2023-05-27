import { getProducts } from "@/service/products";
import { NextResponse } from "next/server";

// app/api 에선 method 별로 나눠서 작성할 수 있다
// 단점은 리턴 타입을 지정할 수 없다는 것이다(generic이 아님)
export async function GET(request: Request, response: Response) {
  const products = await getProducts();
  return NextResponse.json(products);
}
