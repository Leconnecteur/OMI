import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const submitContactForm = async (formData: ContactForm) => {
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID', // Vous devrez remplacer ceci par votre Service ID EmailJS
      'YOUR_TEMPLATE_ID', // Vous devrez remplacer ceci par votre Template ID EmailJS
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'contact@omi.immo',
      },
      'YOUR_PUBLIC_KEY' // Vous devrez remplacer ceci par votre Public Key EmailJS
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error('Erreur lors de l\'envoi du message');
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);
    throw error;
  }
};