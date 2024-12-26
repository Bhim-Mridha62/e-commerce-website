import { NextRequest } from "next/server";

export default function handler(_: NextRequest) {
  console.log(new Date(), "test");
}
