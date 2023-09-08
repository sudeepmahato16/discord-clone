"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import ActionTooltip from "@/components/ActionTooltip";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <div onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all duration-300 w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[44px] w-[44px] rounded-[24px] group-hover:rounded-[12px] transition-all duration-300 overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[12px]"
          )}
        >
          <Image fill src={imageUrl} className="object-cover" alt="Channel" />
        </div>
      </div>
    </ActionTooltip>
  );
};
