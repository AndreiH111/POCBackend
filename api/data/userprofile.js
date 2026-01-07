const userProfile = [
  {
    firstName: "Lucas",
    lastName: "Reynolds",
    position: "Account Manager",
    phone: "+1 415 782 3491",
    email: "lucas.reynolds@testmail.io",
    phoneTooltip: "Call contact",
    emailTooltip: "Send e-mail",
    agendaTooltip: "View schedule",
    photo: "./LucasReynolds.png",
    agendaUrl: "/schedule",

    manager: {
      firstName: "Sofia",
      lastName: "Martinez",
      photo: "./SofiaMartinez.png",
    },

    company: {
      name: "Northstar Solutions Group",
      address: "742 Market Avenue, San Mateo CA 94401, USA",
      email: "contact@northstarsolutions.io",
      emailTooltip: "Contact company",
      websiteTooltip: "Open company website",
      emailSubject: "Business Inquiry",
      website: "www.northstarsolutions.io",
      url: "https://www.northstarsolutions.io",
    },
  },
];

module.exports = { userProfile };
