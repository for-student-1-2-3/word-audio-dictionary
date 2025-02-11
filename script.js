let words = [];
let currentIndex = 0;

async function loadWords() {
    try {
        const response = await fetch("words.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        words = await response.json();
        console.log("✅ words.json 読み込み成功:", words);

        if (words.length > 0) {
            loadWord();
        } else {
            document.getElementById("flashcard").innerHTML = "単語データがありません";
        }
    } catch (error) {
        console.error("❌ words.json の読み込みに失敗:", error);
    }
}

function loadWord() {
    if (words.length === 0) {
        document.getElementById("flashcard").innerHTML = "すべての単語を覚えました！";
        return;
    }

    const currentWord = words[currentIndex];
    console.log(`▶️ 表示中の単語:`, currentWord);

    document.getElementById("word").textContent = currentWord.word;
    document.getElementById("pos").textContent = `(${currentWord.pos})`;
    document.getElementById("translation").textContent = currentWord.translation;

    document.getElementById("pos").classList.add("hidden");
    document.getElementById("translation").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
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
        console.log(`🗑 覚えた単語を削除: ${words[currentIndex].word}`);
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
});
