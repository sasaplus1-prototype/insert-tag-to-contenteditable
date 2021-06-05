(function(){

  'use strict';

  const editor = document.getElementById('js-editor');
  const insert = document.getElementById('js-insert');
  const html = document.getElementById('js-html');

  const domParser = new DOMParser();

  if (editor && insert && html) {
    editor.append('\u200B');

    document.addEventListener('selectionchange', function(event) {
      console.log('selectionchange', window.getSelection());
    }, false);

    editor.addEventListener('input', function(event) {
      console.log('input', event);
    }, false);

    insert.addEventListener('click', function(event) {
      const markup = html.value;

      console.log(markup);

      const doc = domParser.parseFromString(markup, 'text/html');

      const s = window.getSelection();

      if (editor.contains(s.anchorNode)) {
        if (s.isCollapsed) {
          console.log('execute insert');

          const a = s.anchorNode;

          if (a.nodeType === Node.TEXT_NODE) {
            console.log('Node is TEXT_NODE');

            const newNode = a.splitText(s.anchorOffset);
            const fragment = document.createDocumentFragment();

            fragment.append(...doc.body.childNodes);

            newNode.before(fragment);
          }
        } else {
          console.log('execute insert');

          // remove range
          const range = s.getRangeAt(0);
          range.deleteContents();

          const a = s.anchorNode;

          if (a.nodeType === Node.TEXT_NODE) {
            console.log('Node is TEXT_NODE');

            const newNode = a.splitText(s.anchorOffset);
            const fragment = document.createDocumentFragment();

            fragment.append(...doc.body.childNodes);

            newNode.before(fragment);
          }
        }
      }
    }, false);
  }

}());
