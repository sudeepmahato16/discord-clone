import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

interface IParams {
  serverId: string;
}

export const PATCH = async (
  req: NextRequest,
  { params: { serverId } }: { params: IParams }
) => {
  try {
    if (!serverId) return new NextResponse("");
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};
