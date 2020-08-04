/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import "./styles/main.scss";
import "./components/notebook";
import "iframe-resizer/js/iframeResizer.contentWindow.js";
// Globals available to the user in the notebook
import * as lithtml from "lit-html";
window.html = lithtml.html;
window.svg = lithtml.svg;
window.lithtml = lithtml;
const query = new URLSearchParams(window.location.search);
if (query.get('file')) {
    const fileName = query.get('file');
    const notebookFromFile = `https://raw.githubusercontent.com/Sheraff/notebooks/master/${fileName}`;
    fetch(notebookFromFile)
        .then(data => data.text())
        .then(text => {
        if (startsWithCodeBlock(text)) {
            window.initialNotebookContent = text;
        }
        else {
            window.initialNotebookContent = `\`\`\` md\n${text}`;
        }
    })
        .finally(init);
}
else {
    init();
}
function startsWithCodeBlock(text) {
    const regex = /^(\s)*```/;
    return text.match(regex);
}
function init() {
    document.body.innerHTML += `
        <base target="_parent" />
        <starboard-notebook>
        </starboard-notebook>
    `;
}
//# sourceMappingURL=main.js.map