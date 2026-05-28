import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const stateRef = ref(db, "lieDetector/state");

const ids = [
  "showMainTitle",
  "smallTitle",
  "mainTitle",
  "showQuestionBox",
  "questionLabel",
  "questionText",
  "showAnalyzingBox",
  "analyzingText",
  "showResultBox",
  "resultSubText",
  "resultText",
  "resultStyle",
  "showCustomTextBox",
  "customText",
  "showWarningBox",
  "warningText",
  "showBgEffects"
];

function el(id) {
  return document.getElementById(id);
}

function getValue(id) {
  const element = el(id);
  if (!element) return "";

  if (element.type === "checkbox") {
    return element.checked;
  }

  return element.value;
}

function setValue(id, value) {
  const element = el(id);
  if (!element || value === undefined || value === null) return;

  if (element.type === "checkbox") {
    element.checked = Boolean(value);
    return;
  }

  element.value = value;
}

function getStateFromPanel() {
  return {
    showMainTitle: getValue("showMainTitle"),
    smallTitle: getValue("smallTitle"),
    mainTitle: getValue("mainTitle"),

    showQuestionBox: getValue("showQuestionBox"),
    questionLabel: getValue("questionLabel"),
    questionText: getValue("questionText"),

    showAnalyzingBox: getValue("showAnalyzingBox"),
    analyzingText: getValue("analyzingText"),

    showResultBox: getValue("showResultBox"),
    resultSubText: getValue("resultSubText"),
    resultText: getValue("resultText"),
    resultStyle: getValue("resultStyle"),

    showCustomTextBox: getValue("showCustomTextBox"),
    customText: getValue("customText"),

    showWarningBox: getValue("showWarningBox"),
    warningText: getValue("warningText"),

    showBgEffects: getValue("showBgEffects")
  };
}

function sendState() {
  set(stateRef, getStateFromPanel());
}

function loadStateToPanel(state) {
  if (!state) return;
  ids.forEach((id) => setValue(id, state[id]));
}

function setPreset(type) {
  if (type === "truth") {
    el("showAnalyzingBox").checked = false;
    el("showResultBox").checked = true;
    el("resultSubText").value = "FINAL VERDICT";
    el("resultText").value = "TRUTH";
    el("resultStyle").value = "truth";
    el("showWarningBox").checked = false;
  }

  if (type === "lie") {
    el("showAnalyzingBox").checked = false;
    el("showResultBox").checked = true;
    el("resultSubText").value = "FINAL VERDICT";
    el("resultText").value = "LIE";
    el("resultStyle").value = "lie";
    el("showWarningBox").checked = true;
    el("warningText").value = "DECEPTION WARNING DETECTED";
  }

  if (type === "analyze") {
    el("showAnalyzingBox").checked = true;
    el("showResultBox").checked = false;
    el("showWarningBox").checked = false;
  }

  sendState();
}

el("updateScreen").addEventListener("click", sendState);

el("resetScreen").addEventListener("click", () => {
  el("showMainTitle").checked = true;
  el("smallTitle").value = "LIVE AI SCAN";
  el("mainTitle").value = "AI LIE DETECTOR";

  el("showQuestionBox").checked = true;
  el("questionLabel").value = "QUESTION";
  el("questionText").value = "";

  el("showAnalyzingBox").checked = false;
  el("analyzingText").value = "ANALYZING RESPONSE...";

  el("showResultBox").checked = false;
  el("resultSubText").value = "FINAL VERDICT";
  el("resultText").value = "TRUTH";
  el("resultStyle").value = "truth";

  el("showCustomTextBox").checked = false;
  el("customText").value = "";

  el("showWarningBox").checked = false;
  el("warningText").value = "DECEPTION WARNING DETECTED";

  el("showBgEffects").checked = true;

  sendState();
});

el("truthPreset").addEventListener("click", () => setPreset("truth"));
el("liePreset").addEventListener("click", () => setPreset("lie"));
el("analyzePreset").addEventListener("click", () => setPreset("analyze"));

el("clearResult").addEventListener("click", () => {
  el("showResultBox").checked = false;
  sendState();
});

ids.forEach((id) => {
  const element = el(id);
  if (!element) return;
  element.addEventListener("input", sendState);
  element.addEventListener("change", sendState);
});

onValue(stateRef, (snapshot) => {
  const state = snapshot.val();

  if (state) {
    loadStateToPanel(state);
  } else {
    sendState();
  }
});
