# Mazen Elharmeel — Portfolio

A static website. No build step, no install: open `index.html` in a browser.

## Folder structure

```
mazen-portfolio/
├── index.html            Page content (all text, sections, links)
├── css/
│   └── style.css         All styling, split into numbered sections
└── js/
    ├── translations.js   Arabic text (English stays in index.html)
    └── main.js           Scroll animation, theme toggle, language switch
```

## Common edits

| I want to...                    | Edit this                                           |
| ------------------------------- | --------------------------------------------------- |
| Change text                     | `index.html` (and the Arabic in `js/translations.js`) |
| Change colors                   | `css/style.css`, section 1 "Design tokens"          |
| Fix an Arabic translation       | `js/translations.js`                                |
| Change email / social links     | `index.html`, "Contact" section                     |
| Add a new project               | Copy the "Selected work" block in `index.html`      |

When you add or change English text, keep the `data-i18n="key"` attribute and add the same key to `js/translations.js`.

## Publish on GitHub Pages

1. Create a public repository named `mazenelharmeel-spec.github.io`.
2. Upload everything in this folder (keep the `css` and `js` folders).
3. Settings → Pages → Deploy from a branch → `main` / root → Save.
4. Visit https://mazenelharmeel-spec.github.io after a minute or two.
