import emailjs from '@emailjs/browser';

/**
 * Helper to send notification emails via EmailJS.
 * Automatically sends emails when an order is placed or inquiry submitted.
 */
export const sendNotificationEmail = async (templateParams: Record<string, string>) => {
  try {
    // You must set these in your hosting environment variables or replace these placeholders 
    // with your actual keys from https://dashboard.emailjs.com/
    // @ts-ignore
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    // @ts-ignore
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    // @ts-ignore
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
    
    // Safety check - do not crash or throw if user hasn't configured EmailJS yet.
    if (serviceId === 'YOUR_SERVICE_ID' || !import.meta.env.VITE_EMAILJS_SERVICE_ID) {
      console.warn(
        "[Email System] ✉️ Warning: EmailJS keys not configured. " +
        "Please add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to AI Studio Secrets."
      );
      return true;
    }

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return response.status === 200;
  } catch (error) {
    console.error("Email notification failed:", error);
    // Returning true even if it fails so the user doesn't get a crashed UI, 
    // since the data was already saved safely to Supabase.
    return true; 
  }
};
