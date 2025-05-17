// Configuration
export const config = {
  // Replace with your own credentials
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: 'master', // Change if using a different environment
  outputDir: './output',
  contentTypes: [], // Leave empty to download all content types
  contentField: 'content', // The field name that contains the main markdown content
  // Set to true if you only want to download a single entry
  singleEntry: false,
  // entryId: 'YOUR_ENTRY_ID', // Only used if singleEntry is true
};
