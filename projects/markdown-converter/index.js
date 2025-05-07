#!/usr/bin/env node

/**
 * Contentful to Markdown Converter
 *
 * This script downloads all entries from Contentful spaces and converts them
 * to Markdown files with Front Matter headers.
 */

import { createClient } from 'contentful';
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { config } from './config.js';

// Create Contentful client
const client = createClient({
  space: config.space,
  accessToken: config.accessToken,
  environment: config.environment,
});

/**
 * Convert a Contentful entry to Markdown with Front Matter
 */
function convertEntryToMarkdown(entry) {
  // Prepare front matter data (header)
  const frontMatterData = { ...entry.fields };

  // Extract content field if it exists
  const contentField = config.contentField;
  const content = frontMatterData[contentField] || '';

  // Remove content and name fields from front matter
  delete frontMatterData[contentField];
  delete frontMatterData.name;

  // Ensure date is wrapped in quotes
  // if (frontMatterData[config.dateField]) {
  //   frontMatterData[config.dateField] = `${frontMatterData[config.dateField]}`;
  // }

  // Ensure that url is taken from the image field
  if (frontMatterData[config.imageField]) {
    const url = frontMatterData[config.imageField].fields.file.url;
    frontMatterData[config.imageField] = `https:${url}`;
  }

  // Convert front matter to YAML
  const frontMatter = yaml.dump(frontMatterData);

  // Combine front matter and content
  return `---
${frontMatter}---

${content}`;
}

/**
 * Generate a filename from entry name field
 */
function getFilename(entry) {
  const name = entry.fields.name || entry.sys.id;
  return `${name}.md`;
}

/**
 * Download all entries and convert them to markdown files
 */
async function downloadAndConvert() {
  try {
    console.log('Starting Contentful to Markdown conversion...');

    // Create output directory if it doesn't exist
    await fs.mkdir(config.outputDir, { recursive: true });

    // Special case: download a single entry if configured
    if (config.singleEntry && config.entryId) {
      console.log(`Fetching single entry with ID: ${config.entryId}`);
      try {
        const entry = await client.getEntry(config.entryId);
        const filename = getFilename(entry);
        const markdownContent = convertEntryToMarkdown(entry);

        // Write markdown file directly to output directory
        const filePath = path.join(config.outputDir, filename);
        await fs.writeFile(filePath, markdownContent, 'utf8');
        console.log(`Created: ${filePath}`);
        console.log('Conversion completed successfully!');
        return;
      } catch (error) {
        console.error(`Error fetching entry ${config.entryId}:`, error);
        process.exit(1);
      }
    }

    // Get all content types if not specified
    let contentTypes = config.contentTypes;
    if (contentTypes.length === 0) {
      console.log('Fetching all content types...');
      const response = await client.getContentTypes();
      contentTypes = response.items.map(type => type.sys.id);
      console.log(`Found ${contentTypes.length} content types: [${contentTypes.join()}].`);
    }

    // Process each content type
    for (const contentType of contentTypes) {
      console.log(`Processing content type: ${contentType}`);

      // Create a directory for each content type
      const contentTypeDir = path.join(config.outputDir, contentType);
      await fs.mkdir(contentTypeDir, { recursive: true });

      // Get all entries for this content type
      const entries = await client.getEntries({
        content_type: contentType,
        limit: 1000, // Adjust based on your needs
      });

      console.log(`Found ${entries.items.length} entries for ${contentType}.`);

      // Process each entry
      for (const entry of entries.items) {
        const filename = getFilename(entry);
        const markdownContent = convertEntryToMarkdown(entry);

        // Write markdown file
        const filePath = path.join(contentTypeDir, filename);
        await fs.writeFile(filePath, markdownContent, 'utf8');
        console.log(`Created: ${filePath}`);
      }
    }

    console.log('Conversion completed successfully!');
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

// Execute the main function
downloadAndConvert();
