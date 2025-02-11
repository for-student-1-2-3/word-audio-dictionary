// JSONデータを取得して単語リストを作成
fetch("words.json")
    .then(response => response.json())
    .then(words => {
        const wordList = document.getElementById("word-list");

        words.forEach((wordObj, index) => {
            const wordItem = document.createElement("div");
            wordItem.className = "word-item";

            const wordText = document.createElement("span");
            wordText.className = "word-text";
            wordText.textContent = wordObj.word;

            const playButton = document.createElement("button");
            playButton.className = "play-button";
            playButton.textContent = "🔊 再生";
            playButton.onclick = () => {
                const audio = new Audio(wordObj.audio);
                audio.play();
            };

            wordItem.appendChild(wordText);
            wordItem.appendChild(playButton);
            wordList.appendChild(wordItem);
        });
    })
    .catch(error => console.error("Error loading words:", error));
