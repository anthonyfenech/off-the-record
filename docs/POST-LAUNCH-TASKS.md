# Post-Launch Tasks

Operational notes and known issues to address after launch.

## Tooling

- **Site Checker target list update** — Site Checker
  (file:///Users/fenech/Desktop/OTR-TOOLS/site-checker.html)
  expects `css/style.css` which doesn't exist — site uses split
  modular CSS. Update Site Checker target list to point at
  load-bearing files: `variables.css`, `typography.css`,
  `components.css`, `layout.css`, `fonts.css`.
