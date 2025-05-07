/**
 * This is your Sanity client configuration file
 * Copy this file into your website project to connect to the CMS
 */

// Import the Sanity client library
// You'll need to install it with: npm install @sanity/client
import { createClient } from '@sanity/client';

// Create and export the client instance
export const client = createClient({
  // Your project ID - you can find this in the sanity.config.ts or sanity.json file
  projectId: 'v74trmh0',
  
  // The dataset to query from
  dataset: 'production',
  
  // API version - current recommended is v2023-05-03
  apiVersion: '2023-05-03',
  
  // Use the CDN for faster response (set to false if you need real-time updates)
  useCdn: true,
  
  // Token is only needed when you want to update content
  // You can create a read-only token in your Sanity project settings
  // token: 'YOUR_READ_TOKEN',
});

/**
 * Example usage:
 * 
 * // Fetch all formations
 * client.fetch('*[_type == "formation"]').then(formations => {
 *   console.log('Formations:', formations);
 * });
 * 
 * // Fetch a specific testimonial by ID
 * client.fetch('*[_type == "testimonial" && _id == $id][0]', {
 *   id: 'YOUR_DOCUMENT_ID'
 * }).then(testimonial => {
 *   console.log('Testimonial:', testimonial);
 * });
 * 
 * // Fetch featured galleries for homepage
 * client.fetch('*[_type == "gallery" && featured == true]').then(galleries => {
 *   console.log('Featured galleries:', galleries);
 * });
 */ 