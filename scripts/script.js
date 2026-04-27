const audio = document.getElementById("podcast-audio");
const lyricsList = document.getElementById("lyrics-list");

// Replace these lines with your real lyrics/transcript and timestamps.
const lyricsData = [
  { time: 0, text: "Intro music starts.", position: "center" },
  { time: 8, text: "Welcome to the podcast episode.", position: "left" },
  { time: 16, text: "Today we talk about media and storytelling.", position: "right" },
  { time: 26, text: "First topic: background and context.", position: "center" },
  { time: 36, text: "Second topic: practical examples.", position: "right" },
  { time: 48, text: "Final thoughts and closing.", position: "left" }
];

function renderLyrics() {
  lyricsData.forEach((line, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "lyric-line";
    itemDiv.dataset.index = String(index);

    const itemParagraph = document.createElement("p");    
    itemParagraph.style.textAlign = line.position;
    itemParagraph.setAttribute("data-sal", "fade");
    itemParagraph.setAttribute("data-sal-duration", "2000");
    itemParagraph.setAttribute("data-sal-delay", String(line.time * 1000));
    itemParagraph.textContent = line.text;
    itemDiv.appendChild(itemParagraph);
    lyricsList.appendChild(itemDiv);
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
  console.log("sal is a function"); // remember to remove this later
  sal({
    once: false
  });
}

if (audio) {
  audio.addEventListener("timeupdate", highlightCurrentLyric);
  audio.addEventListener("seeked", highlightCurrentLyric);
  audio.addEventListener("play", highlightCurrentLyric);
}
