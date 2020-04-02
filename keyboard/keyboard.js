const Keyboard = {
    pizdec: '',

    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    kod: {
        /*exeptions_1: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
        ],*/
        /*instead_1: [
            'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'
        ],*/
       /* bykvi : [
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"
        ],
        ne_bykvi : [
            "backspace",
            "caps","enter",
            "done",
            "space"
        ],*/
        russian_letters : [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?",
            "ctrl","win","alt","space","alt","ctrl"
        ],
        english_letters : [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "ctrl","win","alt","space","alt","ctrl"
        ],
        eng : true,
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "ctrl", "win", "Alt", "space", "Alt", "ctrl"
        ];
        const jopa = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?",
            "ctrl", "win", "alt", "space", "alt", "ctrl"
        ];
        /*   const exeptions = [
               "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "caps", "enter", ",", ".", "?", "space"
           ];*/
        const true_exeptions = [
            'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', "Backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "BracketLeft", "BracketRight",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Semicolon", "Quote", "Enter",
            "done", "z", "x", "c", "v", "b", "n", "m", "Comma", "Period", "Slash",
            "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight"
        ];
        /* const instead = [
             'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero',
         ];*/

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        let i = 0;
            keyLayout.forEach(key => {
                const keyElement = document.createElement("button");
                const insertLineBreak = ["Backspace", "]", "Enter", "?"].indexOf(key) !== -1;
                // Add attributes/classes
                keyElement.setAttribute("type", "button");
                /* for (let i = 0; i < exeptions.length; i++) {
                     if (exeptions[i] === key) {
                         keyElement.classList.add(`${instead[i]}`);
                         break;
                     }
                 }*/
                keyElement.classList.add("keyboard__key", `${key}`, `${key.toUpperCase()}`, `${jopa[i]}`, `${jopa[i].toUpperCase()}`, `${true_exeptions[i]}`);


                switch (key) {
                    case "Backspace":
                        keyElement.classList.add("keyboard__key--wide", 'position_8');
                        /*keyElement.innerHTML = createIconHTML("backspace");*/
                        keyElement.innerHTML = 'backspace';

                        keyElement.addEventListener("click", () => {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                            this._triggerEvent("oninput");
                        });

                        break;

                    case "caps":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", 'position_20');
                        /*keyElement.innerHTML = createIconHTML("keyboard_capslock");*/
                        keyElement.innerHTML = 'caps';

                        keyElement.addEventListener("click", () => {
                            this._toggleCapsLock();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        });

                        break;

                    case "Enter":
                        keyElement.classList.add("keyboard__key--wide", 'position_13');
                        /*keyElement.innerHTML = createIconHTML("keyboard_return");*/
                        keyElement.innerHTML = 'enter';

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this._triggerEvent("oninput");
                        });

                        break;

                    case "space":
                        keyElement.classList.add("keyboard__key--extra-wide", 'position_32');
                        /*keyElement.innerHTML = createIconHTML("space_bar");*/
                        keyElement.innerHTML = 'space';

                        keyElement.addEventListener("click", () => {
                            this.properties.value += " ";
                            this._triggerEvent("oninput");
                        });

                        break;

                    case "done":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                        /*keyElement.innerHTML = createIconHTML("check_circle");*/
                        keyElement.innerHTML = 'done';

                        keyElement.addEventListener("click", () => {
                            this.close();
                            this._triggerEvent("onclose");
                        });

                        break;
                    default:

                        keyElement.textContent = key.toLowerCase();
                        keyElement.addEventListener("click", () => {
                            if(key>=0 && key<=9  || key === '/' || key === '?') {
                                document.querySelector('.use-keyboard-input').value += key;
                                this.properties.value = document.querySelector('.use-keyboard-input').value;
                            } else {
                                if (key === '[') {
                                    document.querySelector('.use-keyboard-input').value += this.kod.eng ? key : this.properties.capsLock ? jopa[21].toUpperCase() : jopa[21].toLowerCase();
                                    this.properties.value = document.querySelector('.use-keyboard-input').value;
                                } else {
                                    if (key === ']') {
                                        document.querySelector('.use-keyboard-input').value += this.kod.eng ? key : this.properties.capsLock ? jopa[22].toUpperCase() : jopa[22].toLowerCase();
                                        this.properties.value = document.querySelector('.use-keyboard-input').value;
                                    } else {
                                        if (key === ';') {
                                            document.querySelector('.use-keyboard-input').value += this.kod.eng ? key : this.properties.capsLock ? jopa[33].toUpperCase() : jopa[33].toLowerCase();
                                            this.properties.value = document.querySelector('.use-keyboard-input').value;
                                        } else {
                                            if (key === '\'') {
                                                document.querySelector('.use-keyboard-input').value += this.kod.eng ? key : this.properties.capsLock ? jopa[34].toUpperCase() : jopa[34].toLowerCase();
                                                this.properties.value = document.querySelector('.use-keyboard-input').value;
                                            } else {
                                                if (key === ',') {
                                                    document.querySelector('.use-keyboard-input').value += this.kod.eng ? key : this.properties.capsLock ? jopa[44].toUpperCase() : jopa[44].toLowerCase();
                                                    this.properties.value = document.querySelector('.use-keyboard-input').value;
                                                } else {
                                                    if (key === '.') {
                                                        document.querySelector('.use-keyboard-input').value += this.kod.eng ? key : this.properties.capsLock ? jopa[45].toUpperCase() : jopa[45].toLowerCase();
                                                        this.properties.value = document.querySelector('.use-keyboard-input').value;
                                                    } else {
                                                        document.querySelector('.use-keyboard-input').value += this.properties.capsLock ? document.querySelector(`.${key}`).innerHTML.toUpperCase() : document.querySelector(`.${key}`).innerHTML.toLowerCase()
                                                        this.properties.value = document.querySelector('.use-keyboard-input').value /*this.properties.capsLock ? document.querySelector(`.${key}`).innerHTML.toUpperCase() : document.querySelector(`.${key}`).innerHTML.toLowerCase()*/ /*key.toUpperCase() : key .toLowerCase()*/;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            this._triggerEvent("oninput");
                        });
                        /*if(key==="ctrl" || key==="alt" || key==="win") {
                            console.log('1');
                            key.innerHTML = '';
                        }*/

                        break;
                }

                fragment.appendChild(keyElement);

                if (insertLineBreak) {
                    fragment.appendChild(document.createElement("br"));
                }
                i++;
            });
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock && key.innerHTML!=='done' && key.textContent!=='backspace' && key.textContent!=='caps' && key.textContent!=='space' && key.textContent!=='enter' && key.textContent!=='alt' && key.textContent!=='ctrl' && key.textContent!=='win' ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};


document.addEventListener('keydown', (e) => {
    console.log(e.code);
    if(e.keyCode===17) {
        Keyboard.pizdec = 'ctrl';
        let j=0;
        if(Keyboard.kod.eng) {
            document.querySelectorAll('.keyboard__key').forEach(key => {
                key.innerHTML = Keyboard.kod.russian_letters[j];
                j++;
            });
            Keyboard.kod.eng = false;
        } else {
            document.querySelectorAll('.keyboard__key').forEach(key => {
                key.innerHTML = Keyboard.kod.english_letters[j];
                j++;
            });
            Keyboard.kod.eng = true;
        }
    } else {
        if (e.keyCode === 20) {
            if (Keyboard.properties.capsLock) {
                document.querySelector('.caps').classList.remove("keyboard__key--active");

                document.querySelectorAll('.keyboard__key').forEach(key => {
                               key.innerHTML = key.innerHTML.toLowerCase();
                });
                Keyboard.properties.capsLock = false;
            } else {
                document.querySelector('.caps').classList.add("keyboard__key--active");

                document.querySelectorAll('.keyboard__key').forEach(key => {
                    if(key.innerHTML!=='done' && key.innerHTML!=='backspace' && key.innerHTML!=='caps' && key.innerHTML!=='space' && key.innerHTML!=='enter' && key.innerHTML!=='alt' && key.innerHTML!=='ctrl' && key.innerHTML!=='win') {
                        key.innerHTML = key.innerHTML.toUpperCase();
                    }
                });
                Keyboard.properties.capsLock = true;
            }
        } else {
            if(e.key>=0 && e.key<=9 || e.key === '[' || e.key === ']' || e.key === ';' || e.key === '\'' || e.key === ',' || e.key === '.' || e.key === '/' || e.key === 'Control' || e.key === 'Meta' || e.key === 'Alt' || e.key === 'Alt' || e.key === 'Control') {
                Keyboard.pizdec = e.code;
            } else {Keyboard.pizdec = e.key;}
        }

           /* for (let i = 0; i < Keyboard.kod.exeptions_1.length; i++) {
                if (Keyboard.kod.exeptions_1[i] === e.key) {
                    Keyboard.pizdec = Keyboard.kod.instead_1[i];
                    break;
                }
            }
        }*/
    }
    document.querySelector(`.${Keyboard.pizdec}`).classList.add('darkest');
    console.log(Keyboard.pizdec);
});

document.addEventListener('keyup', (e) => {
    document.querySelectorAll('.keyboard__key').forEach(key => {
        key.classList.remove('darkest')
    });
    console.log(Keyboard.pizdec);
});


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});


