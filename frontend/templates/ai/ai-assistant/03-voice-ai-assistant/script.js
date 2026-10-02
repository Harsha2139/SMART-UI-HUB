const $ = s =>
    document.querySelector(s);


let recognition = null;

let listening = false;


const supported =
    ("SpeechRecognition" in window) ||
    ("webkitSpeechRecognition" in window);


if (!supported) {

    $("#support").textContent =
        "● Speech recognition unavailable";

    $("#support").style.color =
        "#ffcc55";

    $("#micBtn").textContent =
        "🎙 Use typed commands below";
}


let voices = [];


function loadVoices() {

    voices =
        speechSynthesis.getVoices();

    $("#voice").innerHTML =
        voices
        .map(
            (v, i) =>
                `<option value="${i}">
                    ${v.name} (${v.lang})
                </option>`
        )
        .join("");
}


loadVoices();


speechSynthesis.onvoiceschanged =
    loadVoices;


$("#speed").oninput = e => {

    $("#speedVal").textContent =
        e.target.value + "×";
};


$("#clear").onclick = () => {

    $("#chat").innerHTML = "";
};


function answer(q) {

    let t = q.toLowerCase();

    let a;


    if (t.includes("time")) {

        a =
            `The time is ${
                new Date()
                .toLocaleTimeString()
            }.`;

    }

    else if (t.includes("study")) {

        a =
            "Use 45–50 minute focus sessions, then take a short break.";

    }

    else if (t.includes("joke")) {

        a =
            "Why did the programmer quit his job? Because he didn't get arrays. 😄";

    }

    else {

        a =
            "AI is the field of building systems that can perform tasks involving learning, reasoning, perception or language. This browser demo uses rule-based replies rather than a real cloud AI model.";
    }


    addMsg(
        "You",
        q,
        "user"
    );


    setTimeout(() => {

        addMsg(
            "VoxAI",
            a,
            "ai"
        );

        speak(a);

    }, 300);
}


function addMsg(
    name,
    text,
    type
) {

    let d =
        document.createElement("div");

    d.className =
        "msg " + type;

    d.innerHTML = `
        <b>${name}</b>
        <p>${text}</p>
    `;

    $("#chat")
        .appendChild(d);

    $("#chat").scrollTop =
        $("#chat").scrollHeight;
}


function speak(text) {

    let u =
        new SpeechSynthesisUtterance(text);

    let v =
        voices[$("#voice").value];

    if (v)
        u.voice = v;

    u.rate =
        Number($("#speed").value);

    speechSynthesis.cancel();

    speechSynthesis.speak(u);
}


function start() {

    if (!supported)
        return;


    let R =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    recognition =
        new R();


    recognition.lang =
        $("#lang").value;


    recognition.interimResults =
        true;


    recognition.continuous =
        false;


    recognition.onstart = () => {

        listening = true;

        $("#state").textContent =
            "Listening...";

        $("#orb")
            .classList.add("listening");

        $("#micBtn").textContent =
            "■ Stop Listening";
    };


    recognition.onresult = e => {

        let text =
            [...e.results]
            .map(r =>
                r[0].transcript
            )
            .join("");


        $("#heard").textContent =
            text;


        if (
            e.results[
                e.results.length - 1
            ].isFinal
        ) {

            answer(text);
        }
    };


    recognition.onerror = e => {

        $("#state").textContent =
            "Microphone error: " +
            e.error;

        stop();
    };


    recognition.onend =
        stop;


    recognition.start();
}


function stop() {

    listening = false;

    $("#orb")
        .classList.remove("listening");

    $("#state").textContent =
        "Press the microphone to start";

    $("#micBtn").textContent =
        "🎙 Start Listening";
}


$("#micBtn").onclick = () => {

    if (listening) {

        recognition?.stop();

    } else {

        start();
    }
};


document
    .querySelectorAll(".commands button")
    .forEach(b => {

        b.onclick = () =>
            answer(b.dataset.cmd);

    });


window.addEventListener(
    "beforeunload",
    () => speechSynthesis.cancel()
);