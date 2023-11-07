// // Models the Data to an Array of Strings
export const dataToStrings = function (data) {
    return [
        `Jitsi bitsi spider #${data.id}`,
        `A talk by ${data.name}`,
        `${data.description}`,
        `click to join`,
        `${data.date}`,
        `${data.time}`,
        `${data.weblink}`,
        `the lecture will be in ${data.language}`
    ];
};

const getRandomInt = max => Math.floor(Math.random() * max);

export const wrapInRandomElement = (str, tags) => {
    const randomTag = tags[getRandomInt(tags.length)];
    return `<${randomTag}>${str}</${randomTag}>`;
};
