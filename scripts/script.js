const audio = document.getElementById("podcast-audio");
const lyricsList = document.getElementById("lyrics-list");

// Replace these lines with your real lyrics/transcript and timestamps.
const lyricsData = [
  { time: 0, text: "Intro music starts." },
  { time: 8, text: "Welcome to the podcast episode." },
  { time: 16, text: "Today we talk about media and storytelling." },
  { time: 26, text: "First topic: background and context." },
  { time: 36, text: "Second topic: practical examples." },
  { time: 48, text: "Final thoughts and closing." }
];

function renderLyrics() {
  lyricsData.forEach((line, index) => {
    const item = document.createElement("div");
    item.className = "lyric-line";
    item.dataset.index = String(index);
    item.setAttribute("data-sal", "fade");
    item.setAttribute("data-sal-duration", "500");
    item.textContent = line.text;
    lyricsList.appendChild(item);
  });
}

function highlightCurrentLyric() {
  if (!audio) {
    return;
  }

  const currentTime = audio.currentTime;
  let activeIndex = -1;

  for (let i = 0; i < lyricsData.length; i += 1) {
    const currentLine = lyricsData[i];
    const nextLine = lyricsData[i + 1];
    const isInRange = currentTime >= currentLine.time && (!nextLine || currentTime < nextLine.time);

    if (isInRange) {
      activeIndex = i;
      break;
    }
  }

  document.querySelectorAll(".lyric-line").forEach((lineEl) => {
    const index = Number(lineEl.dataset.index);
    lineEl.classList.toggle("active", index === activeIndex);
  });
}

renderLyrics();

if (typeof sal === "function") {
  sal({
    once: false
  });
}

if (audio) {
  audio.addEventListener("timeupdate", highlightCurrentLyric);
  audio.addEventListener("seeked", highlightCurrentLyric);
  audio.addEventListener("play", highlightCurrentLyric);
}
