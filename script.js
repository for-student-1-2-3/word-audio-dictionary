let words = [];
let currentIndex = 0;

async function loadWords() {
    try {
        const response = await fetch("words.json");
        words = await response.json();
        loadWord();
    } catch (error) {
        console.error("Error loading words.json:", error);
    }
}

function loadWord() {
    if (words.length === 0) {
        document.getElementById("flashcard").innerHTML = "すべての単語を覚えました！";
        return;
    }

    const currentWord = words[currentIndex];
    document.getElementById("word").textContent = currentWord.word;
    document.getElementById("pos").textContent = `(${currentWord.pos})`;
    document.getElementById("translation").textContent = currentWord.translation;
    
    document.getElementById("pos").classList.add("hidden");
    document.getElementById("translation").classList.add("hidden");
}

document.getElementById("show-translation").addEventListener("click", () => {
    document.getElementById("pos").classList.remove("hidden");
    document.getElementById("translation").classList.remove("hidden");
});

document.getElementById("play-audio").addEventListener("click", () => {
    if (words.length > 0) {
        new Audio(words[currentIndex].audio).play();
    }
});

document.getElementById("learned").addEventListener("click", () => {
    words.splice(currentIndex, 1);
    if (words.length > 0) {
        currentIndex = currentIndex % words.length;
        loadWord();
    } else {
        document.getElementById("flashcard").innerHTML = "すべての単語を覚えました！";
    }
});

// 初回データ読み込み
loadWords();
