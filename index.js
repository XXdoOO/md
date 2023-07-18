const regexObject = {
  headline: /^(\#{1,6})([^\#\n]+)$/m,
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

let text
const editArea = document.querySelector('#edit-p')
const previewArea = document.querySelector('#preview-area')

// 使用textNode内置的替换引擎,将 < > $等字符替换. 但不会替换' 和 "
const parse = function (str) {
  'use strict';
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  str = div.innerHTML
  div = undefined
  return str
}

const parseAll = function () {
  let match, html

  for (let ro in regexObject) {
    while ((match = regexObject[ro].exec(text)) !== null) {
      console.log(match);

      if (ro == 'headline') {
        count = match[1].length;
        text = text.replace(match[0], `<h${count} contenteditable>${parse(match[2].trim())}</h${count}>`).trim()
      } else if (ro == 'lists') {
        if (match[2] == '-') {
          text = text.replace(match[0], `<li contenteditable>${match[3]}</li>`)
        }
      }


    }

    console.log(text);
  }

  previewArea.innerHTML = text
}

editArea.oninput = function () {
  text = editArea.textContent

  parseAll()
}