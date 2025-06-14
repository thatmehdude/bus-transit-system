export const mockRoutes = [
  {
    id: "ikorodu-express",
    name: "Ikorodu Express",
    schedule: ["06:00", "07:30", "09:00", "12:00"],
    status: "on-time" as "on-time",
  },
  {
    id: "brt-ajah",
    name: "BRT Ajah to CMS",
    schedule: ["06:45", "08:00", "09:15", "10:30"],
    status: "delayed" as "delayed",
  },
  {
    id: "yaba-loop",
    name: "Yaba Circular Loop",
    schedule: ["07:00", "10:00", "13:00", "16:00"],
    status: "on-time" as "on-time",
  },
  {
    id: "ikeja-commuter",
    name: "Ikeja Commuter Line",
    schedule: ["06:30", "11:00", "15:00", "18:30"],
    status: "delayed" as "delayed",
  },
  {
    id: "lekki-midnight",
    name: "Lekki Midnight Service",
    schedule: ["22:30", "00:00", "01:30", "03:00"],
    status: "on-time" as "on-time",
  },
  {
    id: "festac-town",
    name: "Festac Town Shuttle",
    schedule: ["05:30", "07:15", "12:00", "17:45"],
    status: "cancelled" as "cancelled",
  },
  {
    id: "ojota-link",
    name: "Ojota – Mile 12 Link",
    schedule: ["06:15", "09:30", "13:45", "17:00"],
    status: "on-time" as "on-time",
  },
];

export const mockStops = [
  {
    id: "cms-terminal",
    name: "CMS Terminal",
    routes: ["ikorodu-express", "brt-ajah", "lekki-midnight"],
  },
  {
    id: "ikeja-underbridge",
    name: "Ikeja Underbridge",
    routes: ["ikeja-commuter", "yaba-loop"],
  },
  {
    id: "yaba-bus-stop",
    name: "Yaba Bus Stop",
    routes: ["yaba-loop", "ojota-link"],
  },
  {
    id: "ajah-roundabout",
    name: "Ajah Roundabout",
    routes: ["brt-ajah", "lekki-midnight"],
  },
  {
    id: "festac-first-gate",
    name: "Festac First Gate",
    routes: ["festac-town", "ojota-link"],
  },
  {
    id: "mile-12-park",
    name: "Mile 12 Park",
    routes: ["ojota-link", "ikorodu-express"],
  },
];

export const mockAlerts = [
  {
    id: "1",
    message: "BRT Ajah to CMS delayed due to flooding on Lekki-Epe expressway",
    severity: "warning" as "warning",
  },
  {
    id: "2",
    message: "Festac Town Shuttle suspended due to road block by agberos",
    severity: "critical" as "critical",
  },
];
