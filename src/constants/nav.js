import {
  Monitor,
  Camera,
  BrainCircuit,
  SlidersHorizontal,
  ParkingSquare,
  DoorOpen,
  CalendarCheck,
  ShieldAlert,
} from "lucide-react";

export const NAV_SECTIONS = [
  {
    label: "Main Menu",
    items: [
      { label: "Live Monitoring", path: "/dashboard", icon: Monitor },
      { label: "CCTV Feeds", path: "/dashboard/cctv-feeds", icon: Camera },
      { label: "AI Predictions", path: "/dashboard/ai-predictions", icon: BrainCircuit },
      { label: "Controls", path: "/dashboard/controls", icon: SlidersHorizontal },
      { label: "Parking", path: "/dashboard/parking", icon: ParkingSquare },
      { label: "Smart Gates", path: "/dashboard/smart-gates", icon: DoorOpen },
      { label: "Darshan Bookings", path: "/dashboard/darshan-bookings", icon: CalendarCheck },
      { label: "Security", path: "/dashboard/security", icon: ShieldAlert },
    ],
  },
];
