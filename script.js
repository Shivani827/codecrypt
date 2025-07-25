function encode() {
  const text = document.getElementById("inputText").value;
  const method = document.getElementById("method").value;

  let result = "";

  if (method === "caesar") {
    result = caesarCipher(text, 3);
  } else if (method === "reverse") {
    result = reverseText(text);
  } else if (method === "emoji") {
    result = emojiEncode(text);
  }

  document.getElementById("outputText").value = result;
}

function decode() {
  const text = document.getElementById("inputText").value;
  const method = document.getElementById("method").value;

  let result = "";

  if (method === "caesar") {
    result = caesarCipher(text, -3);
  } else if (method === "reverse") {
    result = reverseText(text);
  } else if (method === "emoji") {
    result = emojiDecode(text);
  }

  document.getElementById("outputText").value = result;
}

// Caesar Cipher Logic
function caesarCipher(str, shift) {
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
      } else {
        return char;
      }
    })
    .join("");
}

// Reverse Text
function reverseText(str) {
  return str.split("").reverse().join("");
}

// Emoji Code
const emojiMap = {
  a: "🍎", b: "🐝", c: "🐱", d: "🐶", e: "🦅", f: "🐸", g: "🦒",
  h: "🏠", i: "🍦", j: "🕹️", k: "🔑", l: "🦁", m: "🌝", n: "👃",
  o: "🐙", p: "🅿️", q: "👸", r: "🌈", s: "🐍", t: "🌴", u: "☂️",
  v: "🎻", w: "🌊", x: "❌", y: "🛳️", z: "⚡"
};

const reverseEmojiMap = Object.fromEntries(
  Object.entries(emojiMap).map(([k, v]) => [v, k])
);

function emojiEncode(text) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => emojiMap[char] || char)
    .join("");
}

function emojiDecode(text) {
  let result = "";
  let i = 0;

  while (i < text.length) {
    let matched = false;
    for (const [emoji, char] of Object.entries(reverseEmojiMap)) {
      if (text.startsWith(emoji, i)) {
        result += char;
        i += emoji.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i++;
    }
  }

  return result;
}

function copyResult() {
  const output = document.getElementById("outputText");
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
}

function clearAll() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";
}
