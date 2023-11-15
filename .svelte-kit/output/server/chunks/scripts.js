function formatDateAndTime(date, time) {
  let dateTime = /* @__PURE__ */ new Date(`${date}T${time}`);
  let formattedDate = dateTime.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });
  let formattedTime = dateTime.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  return { formattedDate, formattedTime };
}
const dataToStrings = function(data) {
  const { formattedDate, formattedTime } = formatDateAndTime(
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
    `the lecture will be in ${data.captionText.en ? "English" : "German"}`
  ];
};
const stringToLettersArray = (str) => {
  let letters = [];
  let words = str.split(" ");
  words.forEach((word) => {
    for (let i = 0; i < word.length; i += 5) {
      let chunk = word.slice(i, i + 5).split("");
      while (chunk.length < 5) {
        chunk.push("");
      }
      letters.push(chunk);
    }
  });
  return letters;
};
export {
  dataToStrings as d,
  stringToLettersArray as s
};
