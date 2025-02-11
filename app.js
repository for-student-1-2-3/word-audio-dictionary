let words = [];
let index = 0;

async function loadWords() {
    try {
        const response = await fetch("words.json");
        words = await response.json();
        updateWord();
    } catch (error) {
        console.error("❌ words.json の読み込みに失敗:", error);
    }
}

function updateWord() {
    if (words.length === 0) {
        document.getElementById("wordDisplay").textContent = "単語がありません";
        return;
    }

    const currentWord = words[index];
    document.getElementById("wordDisplay").textContent = currentWord.word;
    document.getElementById("meaningDisplay").textContent = currentWord.translation;
    document.getElementById("hintDisplay").textContent = currentWord.hint || "ヒントなし";

    document.getElementById("meaningDisplay").classList.add("hidden");
    document.getElementById("hintDisplay").classList.add("hidden");
}

document.getElementById("confirmButton").addEventListener("click", () => {
    document.getElementById("meaningDisplay").classList.remove("hidden");
});

document.getElementById("notLearnedButton").addEventListener("click", () => {
    index = (index + 1) % words.length;
    updateWord();
});

document.getElementById("speakButton").addEventListener("click", () => {
    new Audio(words[index].audio).play();
});

// 初回データ読み込み
loadWords();
