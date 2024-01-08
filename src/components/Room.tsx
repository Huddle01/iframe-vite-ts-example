"use client";

import { HuddleIframe, iframeApi, useEventListener } from "@huddle01/iframe";
import { darkTheme, lightTheme } from "@huddle01/iframe/types";
import Customize from "../components/Customize/Customize";
import HuddleLogo from "../components/HuddleLogo";
import DocBtn from "../components/DocBtn";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const [isDark, setIsDark] = useState(true);

  const { roomId } = useParams();

  useEventListener("room:recording-started", () => {
    console.log("room:recording-started");
  });
  useEventListener("room:recording-stopping", () => {
    console.log("room:recording-stopping");
  });
  useEventListener("room:recording-stopped", (data) => {
    console.log({ "room:recording-stopped": data });
  });

  useEventListener("app:initialized", () => {
    console.log("app:initialized");

    iframeApi.initialize({
      redirectUrlOnLeave: "https://huddle01.com",
    });
  });

  return (
    <main className="h-screen flex items-center flex-col">
      <div className="flex items-center justify-between w-full py-3 px-6">
        <HuddleLogo />
        <DocBtn />
      </div>
      <div className="flex items-center w-full flex-1">
        <Customize setIsDark={setIsDark} isDark={isDark} />
        <div className="aspect-video w-full mx-auto p-4 flex">
          <HuddleIframe
            // if you add autojoin = true, skips the lobby and goes directly to the room
            roomUrl={`https://iframe.huddle01.com/${roomId}/lobby?displayName=axitdoteth&autojoin=true`}
            // if you don't add displayName, you'll be directed to the lobby
            // roomUrl={`https://iframe.huddle01.com/${params.roomId}/`}
            className="w-full aspect-video"
            theme={isDark ? darkTheme : lightTheme}
            projectId={import.meta.env.VITE_API_HUDDLE01_PROJECT_ID || ""}
          />
        </div>
      </div>
    </main>
  );
}
