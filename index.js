const regexObject = {
  headline: /^(#{1,6}) (.+)/m,
  code: /\s\`\`\`\n?([^`]+)\`\`\`/g,
  hr: /^(?:([\*\-_] ?)+)\1\1$/gm,
  lists: /^(\s*)(-|\d\.) (.*)$/gm,
  bolditalic: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/g,
  links: /!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g,
  reflinks: /\[([^\]]+)\]\[([^\]]+)\]/g,
  smlinks: /\@([a-z0-9]{3,})\@(t|gh|fb|gp|adn)/gi,
  mail: /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
  tables: /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g,
  include: /[\[<]include (\S+) from (https?:\/\/[a-z0-9\.\-]+\.[a-z]{2,9}[a-z0-9\.\-\?\&\/]+)[\]>]/gi,
  url: /<([a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)>/g
}

const p = document.querySelector('p[contenteditable="plaintext-only"]')

p.onblur = function () {
  let match, level, text = this.textContent

  console.log(this.text);

  for (let ro in regexObject) {
    while ((match = regexObject[ro].exec(text)) !== null) {
      console.log(match);

      if (ro == 'headline') {
        level = match[1].length

        text = text.replace(match[0], `<h${level} contenteditable="plaintext-only">${(match[2].trim())}</h${level}>`).trim()
      } else if (ro == 'lists') {
        if (match[2] == '-') {
          text = text.replace(match[0], `<li contenteditable="plaintext-only">${match[3]}</li>`)
        }
      }
    }
    console.log(text);
  }
}



p.onkeydown = function (e) {
  if (e.keyCode === 13) {
    console.log(444);
    // e.preventDefault();
  }
}