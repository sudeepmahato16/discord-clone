import { NextApiRequest } from "next";
import { auth, getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = async (req?: NextApiRequest) => {
  const { userId } = req ? getAuth(req) : auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
