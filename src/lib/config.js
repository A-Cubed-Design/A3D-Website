export const config = {
  forms: {
    contact: import.meta.env.VITE_GOOGLE_FORM_CONTACT,
    brailleUsers: import.meta.env.VITE_GOOGLE_FORM_BRAILLE_USERS,
    teachers: import.meta.env.VITE_GOOGLE_FORM_TEACHERS,
  },
  site: {
    url: import.meta.env.VITE_SITE_URL || 'https://acubed.design',
    title: import.meta.env.VITE_SITE_TITLE || 'A Cubed Design',
    description: import.meta.env.VITE_SITE_DESCRIPTION || 'Tackling the braille literacy crisis by making it easier for blind individuals to acquire braille displays',
  },
};
