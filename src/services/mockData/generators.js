export function jitter(base, range) {
  return +(base + (Math.random() * 2 - 1) * range).toFixed(1);
}

export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function timeAgo(minutesAgo) {
  if (minutesAgo < 1) return "just now";
  if (minutesAgo === 1) return "1 minute ago";
  if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
  const h = Math.floor(minutesAgo / 60);
  return `${h} hour${h > 1 ? "s" : ""} ago`;
}
