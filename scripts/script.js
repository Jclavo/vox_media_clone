const audio = document.getElementById("podcast-audio");
const lyricsList = document.getElementById("lyrics-list");
let lyricsData = [];

async function loadLyricsData(filePath) {
  const response = await fetch(filePath);
  const raw = await response.text();

  return raw
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const [type, time, text, position] = line.split("|");
      const entry = { type, time: Number(time), text };
      if (position) entry.position = position;
      return entry;
    });
}

function renderLyrics() {

  let itemDiv = null;
  let itemParagraph = null;
  let actualLineType = null;
  let previousLineType = null;
  let indexSection = 0;

  for (let index = 0; index < lyricsData.length; index++) {
    const line = lyricsData[index];
    actualLineType = line.type;

    if (actualLineType == "section") {
      itemDiv = renderDiv(indexSection, line.time);
      lyricsList.appendChild(itemDiv);
      previousLineType = actualLineType;
      indexSection++
      continue;
    }

    if (actualLineType == "line") {
      itemParagraph = renderParragraph(line);
    }

    previousLineType = actualLineType;

    if (itemDiv == null || itemParagraph == null) {
      continue;
    }

    itemDiv.appendChild(itemParagraph);
  }
}

function renderDiv(index, time) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "lyrics-section";
  itemDiv.dataset.index = String(index);
  itemDiv.style.backgroundColor = getRandomColor();
  itemDiv.setAttribute("data-sal", "fade");
  itemDiv.style.transitionDuration = "1s";

  return itemDiv;
}

function renderParragraph(line) {
  const itemParagraph = document.createElement("p");
  // Safely handle the case where 'position' may not be present
  itemParagraph.style.textAlign = line.position || "left";
  itemParagraph.setAttribute("data-sal", "fade");
  itemParagraph.style.transitionDuration = "2s";

  // Use 'start' for the display delay, fallback to 0
  itemParagraph.style.transitionDelay = (line.time || 0) * 1000 + "ms";
  itemParagraph.textContent = line.text;
  itemParagraph.className = "lyrics-line";
  return itemParagraph;
}

function highlightCurrentLyric() {
  if (!audio) {
    return;
  }

  const currentTime = audio.currentTime;
  let activeIndex = -1;

  const lyricsDataSections = lyricsData.filter(section => section.type === "section");

  for (let i = 0; i < lyricsDataSections.length; i += 1) {
    const currentSection = lyricsDataSections[i];
    const nextSection = lyricsDataSections[i + 1];
    const isInRange = currentTime >= currentSection.time && (!nextSection || currentTime < nextSection.time);

    if (isInRange) {
      activeIndex = i;
      break;
    }
  }

  document.querySelectorAll(".lyrics-section").forEach((sectionEl) => {
    const index = Number(sectionEl.dataset.index);
    sectionEl.style.display = index !== activeIndex ? "none" : "block";
  });
}

function getRandomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// Usage
(async () => {
  lyricsData = await loadLyricsData("transcripts/episode_1.csv");
  renderLyrics();

  if (typeof sal === "function") {
    console.log("sal is a function"); // remember to remove this later
    sal({
      once: false
    });
  }
})();


if (audio) {
  audio.addEventListener("timeupdate", highlightCurrentLyric);
  audio.addEventListener("seeked", highlightCurrentLyric);
  audio.addEventListener("play", highlightCurrentLyric);
}
