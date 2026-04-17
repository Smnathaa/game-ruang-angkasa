document.addEventListener("DOMContentLoaded", () => {

    const questions = [
        { q: "Planet terbesar di tata surya?", a: "Jupiter" },
        { q: "Planet tempat kita tinggal?", a: "Bumi" },
        { q: "Planet merah?", a: "Mars" },
        { q: "Planet bercincin?", a: "Saturnus" },
        { q: "Planet terdekat dari Matahari?", a: "Merkurius" },
        { q: "Planet paling panas?", a: "Venus" },
        { q: "Planet paling jauh dari Matahari?", a: "Neptunus" },
        { q: "Planet berwarna biru muda?", a: "Uranus" },
        { q: "Planet gas raksasa terbesar?", a: "Jupiter" },
        { q: "Planet dengan cincin paling indah?", a: "Saturnus" },
        { q: "Planet yang memiliki kehidupan?", a: "Bumi" },
        { q: "Planet yang dikenal sebagai planet dingin?", a: "Neptunus" }
    ];

    let current = 0;
    let score = 0;
    let canClick = true; // 🔒 anti spam klik

    function loadQuestion() {
        const qEl = document.getElementById("question");

        if (!qEl) {
            console.error("Element #question tidak ditemukan!");
            return;
        }

        qEl.innerText = questions[current].q;
    }

    // 🎯 POPUP MODERN FUNCTION
    function showPopup(type, text) {
        const popup = document.getElementById("resultPopup");
        const resultText = document.getElementById("resultText");

        resultText.innerText = text;
        resultText.className = "";

        if (type === "correct") {
            resultText.classList.add("correct");
        } else {
            resultText.classList.add("wrong");
        }

        popup.classList.remove("hidden");

        setTimeout(() => {
            popup.classList.add("hidden");
        }, 900);
    }

    loadQuestion();

    document.querySelectorAll(".planet").forEach(p => {

        // ❌ blok klik kanan
        p.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        p.addEventListener("click", () => {

            // 🔒 hanya boleh 1 kali klik sampai selesai proses
            if (!canClick) return;
            canClick = false;

            let name = p.dataset.name;

            if (name === questions[current].a) {
                score += 10;
                showPopup("correct", "BENAR!");
            } else {
                showPopup("wrong", "SALAH!");
            }

            document.getElementById("score").innerText = score;

            current++;
            if (current >= questions.length) current = 0;

            loadQuestion();

            // 🔓 aktif lagi setelah delay
            setTimeout(() => {
                canClick = true;
            }, 300);
        });
    });

});