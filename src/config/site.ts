export const site = {
  name: "Sarthak Talent Partners",
  legalName: "Sarthak Talent Partners Private Limited",
  tagline: "People. Growth. Success.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sarthakco.in",
  email: { general: "hello@sarthakco.in", careers: "careers@sarthakco.in" },
  phone: { display: "+91 83672 51896", tel: "+918367251896" },
  whatsapp: "+918074208483", // optional; renders a WhatsApp link in contact + footer if set
  address: {
    line1: "Shop No 3, Sports World, 35-625, near AOC Center",
    line2: "Mahatma Gandhi Nagar, Seshachala Colony, East Marredpally",
    city: "Secunderabad",
    state: "Telangana",
    pin: "500026",
    country: "India",
  },
  hours: "Mon–Sat, 9:30 am – 6:30 pm IST",
  mapsEmbedUrl: "https://www.google.com/maps?q=Sarthak%20Talent%20Partners%2C%20Shop%20No%203%2C%20Sports%20World%2C%2035-625%2C%20near%20AOC%20Center%2C%20Mahatma%20Gandhi%20Nagar%2C%20East%20Marredpally%2C%20Secunderabad%2C%20Telangana%20500026&output=embed", // Google Maps embed; empty hides the map
  socials: { linkedin: "[[https://www.linkedin.com/company/...]]", instagram: "", x: "" },
  forms: { web3formsKeyEnv: "NEXT_PUBLIC_WEB3FORMS_KEY", resumeUpload: false },
  flags: { showStats: false, showTeam: false },
  analytics: { vercel: true },
} as const;
