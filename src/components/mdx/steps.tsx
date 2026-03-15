import type { ReactNode } from "react";

type StepProps = {
  number: number;
  title: string;
  children: ReactNode;
};

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="not-prose flex gap-4 my-6">
      <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-lg mb-2">{title}</p>
        <div className="text-gray-600 text-sm space-y-2">{children}</div>
      </div>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <div className="my-6 space-y-2">{children}</div>;
}
