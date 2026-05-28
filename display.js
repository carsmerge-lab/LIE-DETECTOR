import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const stateRef = ref(db, "lieDetector/state");

const elements = {
  mainTitleBox: document.getElementById("mainTitleBox"),
  smallTitle: document.getElementById("smallTitle"),
  mainTitle: document.getElementById("mainTitle"),

  questionBox: document.getElementById("questionBox"),
  questionLabel: document.getElementById("questionLabel"),
  questionText: document.getElementById("questionText"),

  analyzingBox: document.getElementById("analyzingBox"),
  analyzingText: document.getElementById("analyzingText"),

  resultBox: document.getElementById("resultBox"),
  resultSubText: document.getElementById("resultSubText"),
  resultText: document.getElementById("resultText"),

  customTextBox: document.getElementById("customTextBox"),
  customText: document.getElementById("customText"),

  warningBox: document.getElementById("warningBox"),
  warningText: document.getElementById("warningText"),

  bgEffects: document.getElementById("bgEffects")
};

function showOrHide(element, shouldShow) {
  if (!element) return;
  element.classList.toggle("hidden", !shouldShow);
}

function setText(element, text) {
  if (!element) return;
  element.textContent = text || "";
}

function applyState(state) {
  if (!state) return;

  showOrHide(elements.bgEffects, state.showBgEffects);
  showOrHide(elements.mainTitleBox, state.showMainTitle);
  showOrHide(elements.questionBox, state.showQuestionBox);
  showOrHide(elements.analyzingBox, state.showAnalyzingBox);
  showOrHide(elements.resultBox, state.showResultBox);
  showOrHide(elements.customTextBox, state.showCustomTextBox);
  showOrHide(elements.warningBox, state.showWarningBox);

  setText(elements.smallTitle, state.smallTitle);
  setText(elements.mainTitle, state.mainTitle);
  setText(elements.questionLabel, state.questionLabel);
  setText(elements.questionText, state.questionText);
  setText(elements.analyzingText, state.analyzingText);
  setText(elements.resultSubText, state.resultSubText);
  setText(elements.resultText, state.resultText);
  setText(elements.customText, state.customText);
  setText(elements.warningText, state.warningText);

  elements.resultText.classList.remove("truth", "lie");

  if (state.resultStyle === "truth") {
    elements.resultText.classList.add("truth");
  }

  if (state.resultStyle === "lie") {
    elements.resultText.classList.add("lie");
  }
}

onValue(stateRef, (snapshot) => {
  const state = snapshot.val();
  applyState(state);
});
