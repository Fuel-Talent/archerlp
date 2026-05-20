import type { ComponentType } from "react";
import {
  Terminal, AlertOctagon, Lock, Quote, TrendingUp, Clock, DollarSign,
  Workflow, Bot, ShieldCheck, Boxes, BookOpen, Activity, Handshake,
  Server, CheckCircle2, Sparkles, CalendarClock,
} from "lucide-react";
import type { IconKey } from "@/content/types";

const map: Record<IconKey, ComponentType<{ className?: string }>> = {
  Terminal, AlertOctagon, Lock, Quote, TrendingUp, Clock, DollarSign,
  Workflow, Bot, ShieldCheck, Boxes, BookOpen, Activity, Handshake,
  Server, CheckCircle2, Sparkles, CalendarClock,
};

export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const C = map[name] ?? Terminal;
  return <C className={className} />;
}
