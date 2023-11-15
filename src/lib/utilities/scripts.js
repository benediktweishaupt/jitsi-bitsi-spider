// Helper Classes and Functions for the project
class RandomGenerator {
    getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    getRandomNumberPx(max) {
        return `${this.getRandomNumber(max)}px`;
    }

    getRandomItem(array) {
        if (!Array.isArray(array) || array.length === 0) {
            throw new Error('Input must be a non-empty array');
        }
        return array[this.getRandomNumber(array.length)];
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Used Marco Land
// Goes into data Alternation Algorithms
// Models the Data to an Array of Strings
function formatDateAndTime(date, time) {
    // Convert date and time to Date object
    let dateTime = new Date(`${date}T${time}`);

    // Format date as DD.MM.YY
    let formattedDate = dateTime.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

    // Format time as HH:MM
    let formattedTime = dateTime.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return {formattedDate, formattedTime};
}

export const dataToStrings = function (data) {
    const {formattedDate, formattedTime} = formatDateAndTime(
        data.dateTime.date,
        data.dateTime.time
    );

    return [
        `Jitsi bitsi spider #${data.editionNumber}`,
        `A talk by ${data.name}`,
        `${data.captionText.en || data.captionText.de}`,
        `click to join`,
        `${formattedDate}`,
        `${formattedTime}`,
        `the lecture will be in ${data.captionText.en ? 'English' : 'German'}`
    ];
};

// Used Marco Land
// Goes into string alternation algorithms
export const wrapInRandomElement = (str, tags) => {
    const generator = new RandomGenerator();
    const randomTag = tags[generator.getRandomNumber(tags.length)];
    return `<${randomTag}>${str}</${randomTag}>`;
};

// Used by Nontsikelelo Mutiti
// Goes into string alternation algorithms
export const stringToLettersArray = str => {
    let letters = [];
    let words = str.split(' ');

    words.forEach(word => {
        for (let i = 0; i < word.length; i += 5) {
            let chunk = word.slice(i, i + 5).split('');
            while (chunk.length < 5) {
                chunk.push('');
            }
            letters.push(chunk);
        }
    });

    return letters;
};

// Generate Text and animate image for Jutta Bauer
export class JBauerAnimation {
    static COLOR_BASE = 155;
    static COLOR_RANGE = 100;
    static DELAY = 600;

    constructor() {
        this.wordsElement = null;
        this.imageElement = null;
        this.wordArray = null;
        this.animationLength = null;
        // This ensures that this inside animateWords and animateBackground always refers to the instance of JBauerAnimation, even when these methods are passed as callbacks.
        this.animateWords = this.animateWords.bind(this);
        this.animateBackground = this.animateBackground.bind(this);
    }

    generateColor() {
        return `rgb(${Math.floor(
            Math.random() * JBauerAnimation.COLOR_RANGE +
                JBauerAnimation.COLOR_BASE
        )},0,0)`;
    }

    async animateElement(element, action) {
        let animationOffset = 0;

        for (const item of this.wordArray) {
            await new Promise(resolve => {
                setTimeout(() => {
                    action(element, item, animationOffset);
                    animationOffset += this.animationLength;
                    resolve();
                }, JBauerAnimation.DELAY);
            });
        }
    }

    animateWords(element, word, imagePos) {
        const span = document.createElement('span');
        span.style.color = this.generateColor();
        span.textContent = `${word} `;
        element.appendChild(span);
    }

    animateBackground(element, word, imagePos) {
        const posCss = `0% ${imagePos}%`;
        element.style.backgroundPosition = posCss;
        element.style.backgroundColor = this.generateColor();
    }

    initialize(parameterClass, imageClass, str) {
        this.wordsElement = document.querySelector(parameterClass);
        this.imageElement = document.querySelector(imageClass);
        this.wordArray = str.split(' ');
        this.animationLength =
            Math.round((100 / this.wordArray.length) * 100 + Number.EPSILON) /
            100;

        this.animateElement(this.wordsElement, this.animateWords);
        this.animateElement(this.imageElement, this.animateBackground);
    }
}
export class StyleChanger {
    constructor() {
        this.randomGenerator = new RandomGenerator();
    }

    applyStyle(parameterClass, styleCallback) {
        document.querySelectorAll(parameterClass).forEach(element => {
            styleCallback(element);
        });
    }

    changeStyle(parameterClass, styleProperty, valueGenerator) {
        this.applyStyle(parameterClass, element => {
            element.style[styleProperty] = valueGenerator();
        });
    }

    changeFontSize(parameterClass, min = 1, max = 10) {
        this.changeStyle(
            parameterClass,
            'fontSize',
            () => `${this.randomGenerator.getRandomInt(min, max)}vh`
        );
    }

    changeFlex(parameterClass, amount) {
        this.changeStyle(parameterClass, 'flex', () =>
            Math.floor(Math.random() * amount)
        );
    }

    changeClass(parameterClass, arag) {
        this.applyStyle(parameterClass, element => {
            const className = this.randomGenerator.getRandomItem(arag);
            element.classList.remove('singleLetter--black');
            element.classList.remove('singleLetter--white');
            element.classList.add(className);
        });
    }

    changeBorderRadius(parameterClass, arag) {
        this.applyStyle(parameterClass, element => {
            const item = Array.from({length: 4}, () =>
                this.randomGenerator.getRandomItem(arag)
            );
            element.style.borderRadius = item.join(' ');
        });
    }

    changeColorCss(parameterClass, arag) {
        this.changeStyle(parameterClass, 'backgroundColor', () =>
            this.randomGenerator.getRandomItem(arag)
        );
    }

    changeFontFamily(parameterClass, arag) {
        this.changeStyle(parameterClass, 'fontFamily', () =>
            this.randomGenerator.getRandomItem(arag)
        );
    }

    changeFontColorCss(parameterClass, arag) {
        this.changeStyle(parameterClass, 'color', () =>
            this.randomGenerator.getRandomItem(arag)
        );
    }

    changeBoxRotation(parameterClass, min = 1, max = 10) {
        this.applyStyle(parameterClass, element => {
            const randomInt = this.randomGenerator.getRandomInt(min, max);
            const randvalOne = this.randomGenerator.getRandomInt(1, 50);
            const randvalTwo = this.randomGenerator.getRandomInt(1, 50);
            element.style.transform = `rotate(${randomInt}deg)`;
            element.style.transformOrigin = `${randvalOne}% ${randvalTwo}%`;
        });
    }
    changeBoxShadow(parameterClass, colorArray) {
        this.changeStyle(parameterClass, 'boxShadow', () => {
            const xOffset = this.randomGenerator.getRandomInt(-10, 10);
            const yOffset = this.randomGenerator.getRandomInt(-10, 10);
            const blur = this.randomGenerator.getRandomInt(5, 15);
            const color = this.randomGenerator.getRandomItem(colorArray);
            return `${xOffset}px ${yOffset}px ${blur}px ${color}`;
        });
    }
    cssGradients(parameterClass, arag) {
        this.applyStyle(parameterClass, element => {
            if (Math.random() > 0.97) {
                element.style.background = this.getRandomGradient(arag);
            }
        });
    }
    getRandomGradient = arag => {
        const orientation = Math.floor(Math.random() * 360);
        const colorOne = this.randomGenerator.getRandomItem(arag);
        const colorTwo = this.randomGenerator.getRandomItem(arag);
        return `linear-gradient(${orientation}deg, ${colorOne}, ${colorTwo})`;
    };
    cssIDGradient(parameterClass, arag) {
        this.changeStyle(parameterClass, 'background', () =>
            this.getRandomGradient(arag)
        );
    }
}
// Arrays for Moniker
export class LetterMover {
    constructor(canvasID) {
        this.MOVE_INTERVAL = 1500;
        this.CANVAS_UPDATE_INTERVAL = 4000;
        this.MAX_LETTER_COUNT = 9;
        this.fewColors = ['red', 'blue', 'green', 'black', 'white'];
        this.canvas = document.querySelector(canvasID);
        this.styleChanger = new StyleChanger();
    }

    moveHandler(e, letterID, fewColors) {
        const {pageX: x, pageY: y, target} = e;
        if (target !== this.canvas) {
            return;
        }
        const letter = document.querySelector(letterID);
        if (letter) {
            letter.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
            this.styleChanger.changeFontColorCss(letterID, fewColors);
        }
    }

    updateLetterCount(letterCount, maxLetterCount, moveHandler, fewColors) {
        document.removeEventListener('mousemove', moveHandler);
        letterCount = letterCount < maxLetterCount ? letterCount + 1 : 0;
        const letterID = `#letter-0${letterCount}`;
        setTimeout(
            () =>
                document.addEventListener('mousemove', e =>
                    moveHandler(e, letterID, fewColors)
                ),
            200
        );
        return letterCount;
    }

    initialize() {
        let letterCount = 0;
        if (!this.canvas) {
            console.error(`No element with the id "" found`);
            return;
        }
        const moveHandlerBound = e =>
            this.moveHandler(e, `#letter-0${letterCount}`, this.fewColors);
        this.canvas.addEventListener('mousemove', moveHandlerBound);
        setInterval(() => {
            letterCount = this.updateLetterCount(
                letterCount,
                this.MAX_LETTER_COUNT,
                moveHandlerBound,
                this.fewColors
            );
        }, this.MOVE_INTERVAL);
    }
}

export class ScreenUpdater {
    constructor(colorArray, fontArray) {
        this.colorArray = colorArray;
        this.fontArray = fontArray;
        this.styleChanger = new StyleChanger();
        this.randomGenerator = new RandomGenerator();
    }

    getActiveClass(i, screens, screenClass) {
        return `${screenClass}-${i % screens.length}`;
    }

    removeSelectedClass(selectedElement, selectedClass) {
        if (selectedElement) {
            selectedElement.classList.remove(selectedClass.slice(1));
        }
    }

    addSelectedClass(activeElement, selectedClass) {
        if (activeElement) {
            activeElement.classList.add(selectedClass.slice(1));
        }
    }

    updateElementStyle(activeElement, i, selectedClass, fontArray, colorArray) {
        const textLength = activeElement.textContent.length;
        const idealFontSize = Math.round((100 / textLength ** 2) * 20);

        if (i % 2 !== 1) {
            this.styleChanger.changeFontFamily(selectedClass, fontArray);
            this.styleChanger.changeBoxShadow(selectedClass, colorArray);
        } else {
            activeElement.style.fontSize = `${idealFontSize}vh`;
        }
    }

    initialize() {
        const SCREEN_CLASS = '.screen';
        const SELECTED_CLASS = '.selected';
        const INTERVAL_MS = 500;
        let i = 1;
        setInterval(() => {
            const screens = document.querySelectorAll(SCREEN_CLASS);
            const activeClass = this.getActiveClass(i, screens, SCREEN_CLASS);

            this.removeSelectedClass(
                document.querySelector(SELECTED_CLASS),
                SELECTED_CLASS
            );

            const activeElement = document.querySelector(activeClass);
            this.addSelectedClass(activeElement, SELECTED_CLASS);

            this.styleChanger.changeFontColorCss(
                SELECTED_CLASS,
                this.colorArray
            );

            if (activeElement) {
                this.updateElementStyle(
                    activeElement,
                    i,
                    SELECTED_CLASS,
                    this.fontArray,
                    this.colorArray
                );
            }

            i += 1;
        }, INTERVAL_MS);
    }
}

const getCssValuePrefix = () => {
    let rtrnVal = ''; //default to standard syntax
    const prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    const dom = document.createElement('div');

    for (let i = 0; i < prefixes.length; i++) {
        // Attempt to set the style
        dom.style.background = `${prefixes[i]}linear-gradient(#000000, #ffffff)`;

        // Detect if the style was successfully set
        if (dom.style.background) {
            rtrnVal = prefixes[i];
        }
    }

    return rtrnVal;
};
