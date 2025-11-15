import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col gap-4">
      <Input ref={inputRef} placeholder="Type something..." />
      <Button onClick={handleFocus}>Focus Input</Button>
    </div>
  );
}
