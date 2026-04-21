import { NextResponse } from "next/server";

import { getDemoSessionUser } from "@/lib/demo-session";
import { getAdminTestingBundle } from "@/lib/testing-data";

export async function GET() {
  const user = getDemoSessionUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Admin login required to view testing data." }, { status: 401 });
  }

  return NextResponse.json(getAdminTestingBundle());
}
