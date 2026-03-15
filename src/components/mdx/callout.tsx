import type { ReactNode } from "react";

const styles = {
  tip: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    text: "text-blue-800",
    icon: "💡",
  },
  warning: {
    border: "border-yellow-300",
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    icon: "⚠️",
  },
  danger: {
    border: "border-red-300",
    bg: "bg-red-50",
    text: "text-red-800",
    icon: "🚨",
  },
  info: {
    border: "border-gray-300",
    bg: "bg-gray-50",
    text: "text-gray-800",
    icon: "ℹ️",
  },
} as const;

type CalloutProps = {
  type?: keyof typeof styles;
  title?: string;
  children: ReactNode;
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];

  return (
    <div className={`not-prose rounded-lg border ${s.border} ${s.bg} p-4 my-4`}>
      <div className={`flex gap-2 ${s.text}`}>
        <span>{s.icon}</span>
        {title && <p className="font-semibold">{title}</p>}
      </div>
      <div className={`${s.text} mt-1 text-sm`}>{children}</div>
    </div>
  );
}