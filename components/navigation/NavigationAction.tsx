"use client";
import React from "react";
import { Plus } from "lucide-react";

import ActionTooltip from "../ActionTooltip";
import { useModal } from "@/hooks/useModal";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <div
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="flex mx-3 h-[44px] w-[44px] rounded-[24px] group-hover:rounded-[12px] transition-all duration-300 overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={24}
            />
          </div>
        </div>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
