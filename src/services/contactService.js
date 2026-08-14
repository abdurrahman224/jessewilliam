import { POST } from './httpMethods';
import { ENDPOINT } from './httpEndpoint';
import { apiExecutor } from './apiExecutor';

/**
 * Send contact form message to backend
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - User name
 * @param {string} contactData.email - User email
 * @param {string} contactData.subject - Message subject
 * @param {string} contactData.message - Message content
 * @returns {Promise<Object>} - API response
 */
export const sendContactMessage = async (contactData) => {
  return apiExecutor(() =>
    POST(ENDPOINT.PUBLIC.CONTACT, contactData)
  );
};
