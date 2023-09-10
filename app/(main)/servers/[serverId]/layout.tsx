import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ServerSidebar from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-60 z-20 flex-col">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
