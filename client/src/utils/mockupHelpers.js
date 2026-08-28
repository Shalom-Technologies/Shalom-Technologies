// AI-generated mockups sometimes produce nav links that don't reliably work
// inside the sandboxed preview iframe — e.g. a href that doesn't match any
// element's id on the page, or a link to another "page" (about.html,
// /contact) that doesn't exist in a single self-contained demo document.
// Rather than relying on prompt-following alone to get this right every
// time, this injects a small script into the mockup itself that:
//   - scrolls smoothly to the matching section for any in-page "#id" link
//   - safely no-ops any link that doesn't correspond to real content in
//     this demo (broken anchor, external URL, other "page"), so clicking it
//     does nothing rather than trying to navigate the iframe away from the
//     preview or landing on a blank/broken page.
const NAVIGATION_FIX_SCRIPT = `
<script>
(function () {
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    // In-page anchor link, e.g. href="#services"
    if (href.charAt(0) === '#' && href.length > 1) {
      var target = document.getElementById(href.slice(1));
      event.preventDefault();
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // If there's no matching section, we simply do nothing rather than
      // leaving a broken/dead link click with no feedback.
      return;
    }

    // Empty "#" links, links to other pages, or external URLs: this is a
    // single-page demo, so there's nothing real for these to navigate to.
    // Prevent the click from taking the user out of the preview.
    event.preventDefault();
  });
})();
</script>
`;

/**
 * Returns the mockup HTML with the navigation-fix script injected right
 * before the closing </body> tag (or appended at the end if the model's
 * output is missing one, as a fallback).
 *
 * @param {string} html
 * @returns {string}
 */
export function withWorkingNavigation(html) {
  if (!html) return html;

  if (html.includes('</body>')) {
    return html.replace('</body>', `${NAVIGATION_FIX_SCRIPT}</body>`);
  }

  return `${html}${NAVIGATION_FIX_SCRIPT}`;
}