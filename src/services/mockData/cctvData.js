const CAMERAS = [
  { id: "CAM-001", zone: "Main Hall" },
  { id: "CAM-002", zone: "Entry Gate" },
  { id: "CAM-003", zone: "Sacred Pathway" },
  { id: "CAM-004", zone: "Exit Area" },
  { id: "CAM-005", zone: "Parking Zone A" },
  { id: "CAM-006", zone: "Parking Zone B" },
  { id: "CAM-007", zone: "East Corridor" },
  { id: "CAM-008", zone: "VIP Entrance" },
];

export function cameraFeedsMock() {
  return CAMERAS.map((cam, i) => ({
    ...cam,
    status: i === 6 ? "Offline" : "Live",
    alert: i === 0 ? "Unattended baggage detected" : null,
  }));
}
