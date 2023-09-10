import React, { FC } from "react";
import { redirect } from "next/navigation";
import { Channel, ChannelType } from "@prisma/client";

import ServerHeader from "./ServerHeader";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

interface ServerSideProps {
  serverId: string;
}

const ServerSidebar: FC<ServerSideProps> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const { textChannels, audioChannels, videoChannels } = server.channels.reduce(
    (
      acc: {
        textChannels: Channel[];
        audioChannels: Channel[];
        videoChannels: Channel[];
      },
      channel
    ) => {
      if (channel.type === ChannelType.TEXT) {
        acc.textChannels.push(channel);
      } else if (channel.type === ChannelType.AUDIO) {
        acc.audioChannels.push(channel);
      } else if (channel.type === ChannelType.VIDEO) {
        acc.videoChannels.push(channel);
      }
      return acc;
    },
    { textChannels: [], audioChannels: [], videoChannels: [] }
  );

  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
