import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
// import { Typewriter } from "react-simple-typewriter";
import "highlight.js/styles/atom-one-dark.css"; // or any other theme like atom-one-dark
import { Button } from "@/components/ui/button";
import { CopyIcon, Share2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  role: UIMessage["role"];
  parts: UIMessagePart<UIDataTypes, UITools>[];
  status?: ReturnType<typeof useChat>["status"];
}

export const MessagesCard = ({ role, parts, status }: Props) => {
  return (
    <div className="">
      {role === "user" ? (
        <UserMessage parts={parts} />
      ) : (
        <AssistantMessage parts={parts} status={status} />
      )}
    </div>
  );
};

const UserMessage = ({
  parts,
}: {
  parts: UIMessagePart<UIDataTypes, UITools>[];
}) => {
  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        className="w-full flex justify-end text-[15px] pr-4"
        key="user-message-card"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="shadow-none w-fit max-w-[60%] py-2 px-4 rounded-md! bg-primary/70 text-white border-primary/30">
          {Array.isArray(parts) &&
            parts.map((part, i) => {
              if (part.type === "text") {
                return <div key={i}>{part.text}</div>;
              }
              // Optional: fallback for other part types
              return null;
            })}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

interface AssistantMessagePros {
  parts: UIMessagePart<UIDataTypes, UITools>[];
  status?: ReturnType<typeof useChat>["status"];
}

export const AssistantMessage = React.memo(
  ({ parts, status }: AssistantMessagePros) => {
    const markdown = parts
      .filter((part) => part.type === "text")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .map((part) => part.text)
      .join("\n\n");

    return (
      <div
        className={cn("flex flex-col group px-2 pb-4 max-w-[70%] text-[16px]")}
      >
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={`/logo.svg`}
            alt="vibe"
            width={18}
            height={18}
            className="shrink-0"
          />
          <span className="text-sm font-medium">Vanguox</span>
          <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 font-medium">
            {format(Date.now(), "HH:mm 'on' MM dd, yyyy")}
          </span>
        </div>

        <div className="w-full flex justify-start flex-col gap-y-2">
          <Card
            className={cn(
              "shadow-none text-[15px] bg-transparent dark:bg-neutral-900 w-fit p-5 border-none animate-fade-in max-w-full lg:max-w-[600px]"
            )}
          >
            {/* {isTypewriter ? (
            <Typewriter typeSpeed={10} words={[content]} />
          ) : ( */}
          
            <MemoizedMarkdown content={markdown} id="123456" />
            {/* )} */}
            {status === "ready" && (
              <div className="h-7 -mt-7 -ml-2 flex justify-start items-center transition-all duration-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={`ghost`}
                      size={`icon`}
                      className="cursor-pointer p-0! rounded-[10px]!"
                    >
                      <CopyIcon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy text</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={`ghost`}
                      size={`icon`}
                      className="cursor-pointer rounded-[10px]!"
                    >
                      <Share2Icon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share link</TooltipContent>
                </Tooltip>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }
);

AssistantMessage.displayName = "AssistantMessage";
