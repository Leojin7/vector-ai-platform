/**
 * PostCSS config – Next 15 compliant (no require() in plugins array)
 * If you need extra plugins, follow the same pattern:
 *   – string for “no-options”
 *   – [`plugin-name`, { /* options */ /* }]  for plugins that need options
*/
module.exports = {
  plugins: [
    /* Tailwind v4 PostCSS bridge */
    '@tailwindcss/postcss',

    /* Example: enable nesting (optional)
       'tailwindcss/nesting': 'postcss-nesting',
    */

    /* Autoprefixer (always last) */
    'autoprefixer',
  ],
};
