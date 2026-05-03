const audio = document.getElementById("podcast-audio");
const lyricsList = document.getElementById("lyrics-list");

// Replace these lines with your real lyrics/transcript and timestamps.
const lyricsData = [
  { type: "section", time: 0, text: "Intro"},
  { type: "line", time: 1, text: "Music starts.", position: "center"},
  { type: "line", time: 6, text: "Welcome to the podcast episode.", position: "left"},
  { type: "line", time: 10, text: "Today we talk about media and storytelling.", position: "right"},

  { type: "section", time: 16, text: "First topic:"},
  { type: "line", time: 20, text: "Background.", position: "center"},
  { type: "line", time: 24, text: "Context.", position: "center"},
  
  { type: "section", time: 30, text: "Second topic:"},
  { type: "line", time: 34, text: "Second topic: practical examples.", position: "right"},
  
  { type: "section", time: 40, text: "Last Topic"},
  { type: "line", time: 44, text: "Final thoughts", position: "left"},
  { type: "line", time: 48, text: "Closing.", position: "left"},
  
  { type: "section", time: 50, text: "Outro"},
  { type: "line", time: 54, text: "Outro music starts.", position: "center"},
];

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
  itemDiv.className = "lyric-section";
  itemDiv.dataset.index = String(index);
  itemDiv.style.backgroundColor = getRandomColor();
  itemDiv.setAttribute("data-sal", "fade");
  itemDiv.style.transitionDuration = "1s";

  // Use 'start' for the display delay, fallback to 0
  itemDiv.style.transitionDelay = (time || 0) * 1000 + "ms";
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
  itemParagraph.className = "paragraph-line";
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

  document.querySelectorAll(".lyric-section").forEach((sectionEl) => {
    const index = Number(sectionEl.dataset.index);
    sectionEl.style.display = index !== activeIndex ? "none" : "block";
  });
}

function getRandomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
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
