export function getTime(beginTime) {
  const date = new Date(beginTime);
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
