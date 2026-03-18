const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCsebzRfMhwYfjeBIxNX1brg";

export async function fetchYoutubeVideos() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=7`,
  );

  const data = await res.json();

  return data.items.filter(
    (item) =>
      item.id.kind === "youtube#video" &&
      item.snippet.title !== "Private video",
  );
}
