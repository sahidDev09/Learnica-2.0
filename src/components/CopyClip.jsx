import React from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useClipboard } from "@/hooks/useCopyClip";

export default function CopyToClipboard({ message, className, ...props }) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div>
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8"
        onClick={onCopy}>
        {isCopied ? (
          <CheckIcon className=" h-4 w-4 text-emerald-500" />
        ) : (
          <CopyIcon className=" h-4 w-4 text-zinc-500" />
        )}
        <span>Copy message</span>
      </Button>
    </div>
  );
}
