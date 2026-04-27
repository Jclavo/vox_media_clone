const audio = document.getElementById("podcast-audio");
const lyricsList = document.getElementById("lyrics-list");

// Replace these lines with your real lyrics/transcript and timestamps.
const lyricsData = [
  { time: 0, text: "Intro music starts.", position: "center"},
  { time: 6, text: "Welcome to the podcast episode.", position: "left"},
  { time: 10, text: "Today we talk about media and storytelling.", position: "right"},


  { time: 16, text: "First topic:", position: "center"},
  { time: 20, text: "Background.", position: "center"},
  { time: 24, text: "Context.", position: "center"},

  { time: 30, text: "Second topic.", position: "right"},
  { time: 34, text: "Second topic: practical examples.", position: "right"},

  { time: 40, text: "Last Topic", position: "left"},
  { time: 44, text: "Final thoughts", position: "left"},
  { time: 48, text: "Closing.", position: "left"},
];

function renderLyrics() {
  lyricsData.forEach((line, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "lyric-line";
    itemDiv.dataset.index = String(index);

    const itemParagraph = document.createElement("p");    
    itemParagraph.style.textAlign = line.position;
    itemParagraph.setAttribute("data-sal", "fade");
    itemParagraph.style.transitionDuration = "2s";
    itemParagraph.style.transitionDelay = line.time * 1000 + "ms";
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
