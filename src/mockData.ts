export const mockRoutes = [
  {
    id: "blue-line",
    name: "Blue Line Subway",
    schedule: ["08:15", "08:30", "08:45"],
    status: "on-time" as "on-time",
  },
  {
    id: "bus-101",
    name: "Bus 101 Downtown",
    schedule: ["08:20", "08:35", "08:50"],
    status: "delayed" as "delayed",
  },
  {
    id: "r1",
    name: "Red Line Express",
    schedule: ["07:00", "09:00", "13:00", "17:00"],
    status: "on-time" as "on-time",
  },
  {
    id: "r2",
    name: "Blue Line Local",
    schedule: ["06:30", "10:00", "14:00", "18:30"],
    status: "delayed" as "delayed",
  },
  {
    id: "r3",
    name: "Green Line",
    schedule: ["08:15", "12:30", "16:45", "20:00"],
    status: "on-time" as "on-time",
  },
  {
    id: "r4",
    name: "Yellow Loop",
    schedule: ["07:45", "11:15", "15:30", "19:00"],
    status: "cancelled" as "cancelled",
  },
  {
    id: "r5",
    name: "Purple Night",
    schedule: ["22:00", "23:30", "01:00", "03:30"],
    status: "on-time" as "on-time",
  },
];
