import LOGO from "./assets/images/logo.png";
import DATES from "./assets/images/dates.png";
import EYE_ICON from "./assets/images/eye-icon.png";
import EYE_ICON_HIDE from "./assets/images/eye-icon-hide.png";

export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

export const logo = LOGO;
export const dates = DATES;

export const EYE_ICONS = {
  SHOW: EYE_ICON,
  HIDE: EYE_ICON_HIDE,
};

export const formList = [
  { formName: "Pro/Am 1 Danse", navigate: "/pa1d" },
  { formName: "Pro/Am Multi Danse", navigate: "/pamulti" },
];

export const INIT_MSG = "msg";

export const disclaimer = `L'organisateur n'est pas tenu responsable en cas de perte ou de vol d'articles 
personnels laissés dans les vestiaires, salle de bal ou chambre d'hôtel. L'organisateur ne peut être tenu 
responsable des blessures subies par les personnes suivantes : compétiteurs, spectateurs, employés, officiels, 
vendeurs, bénévoles ou tout autre personne assistant à l'évènement. Chacun y participe à ses risques et périls. 
Les organisateurs se réservent le droit d'annuler ou de refuser l'inscription d'un compétiteur ayant manqué 
de respect envers les officiels ou le personnel travaillant pour le Championnat Canadien National, et 
ne se conformant pas au présent règlement.`;

export const ageGroups = {
  paSDAgeGroups: [
    "JV|(JV 11-)|0",
    "JR|(JR 12-15)|0",
    "JE|(JE 16-18)|1",
    "A|(A 19+)|1",
    "B|(B 30+)|1",
    "C|(C 40+)|1",
    "D|(D 50+)|1",
    "E|(E 60+)|1",
    "F|(F 70+)|1",
  ],
  paChampAgeGroups: [
    "JV 11 & -| |0",
    "JR 12-15| |0",
    "JE 16-18| |1",
    "A 19+| |1",
    "B 36+| |1",
    "C 51+| |1",
    "D 61+| |1",
    "E 71+| |1",
  ],
  paScholAgeGroups: [
    "JR 15-| |0",
    "JE 16-18| |1",
    "A 19+| |1",
    "B 36+| |1",
    "C 51+| |1",
    "D 61+| |1",
  ],
  paSolosAgeGroups: ["All| |1"],
};

// pro-am single dance data
export const paSDLevelsClosed = [
  "Débutant",
  "Bronze 1",
  "Bronze",
  "Argent 1",
  "Argent",
  "Or",
  "Or 1",
];

export const paSDLevelsOpen = [
  "Débutant",
  "Bronze 1",
  "Bronze",
  "Argent 1",
  "Argent",
  "Or",
  "Or 1",
  "Or Avancé",
];

export const paSDDanceDivision = [
  ["smooth", ["W", "T", "F", "VW", "PB"]],
  [
    "rhythm",
    [
      "C",
      "R",
      "SW",
      "B",
      "M",
      "SAL",
      "ME",
      "BA",
      "H",
      "WCS",
      "SAM",
      "PD",
      "TA",
      "MI",
      "TV",
    ],
  ],
  ["ballroom", ["W", "T", "VW", "F", "Q"]],
  ["latin", ["C", "S", "R", "PD", "J"]],
];

// pro-am 3-dance data
export const paChampClosedLevels = ["Déb. à Bronze", "Argent & Or"];

export const paChampOpenLevels = ["Bronze", "Argent", "Or"];

export const paChampDances = [
  "Smooth (W/T/F)",
  "Rhythm (C/R/Sw)",
  "Ballroom (W/T/F)",
  "Latin (C/R/S)",
];

// pro-am scholarships data
export const paScholDances = [
  "Smooth (W/T/F/VW)",
  "Rhythm (C/R/Sw/B/M)",
  "Ballroom (W/T/VW/F/Q)",
  "Latin (C/S/R/P/J)",
];

// pro-am solo data
export const divisions = ["smooth", "rhythm", "ballroom", "latin"];

// dance names for tooltips
export const danceNames = {
  w: "waltz",
  t: "tango",
  f: "foxtrot",
  vw: "viennese waltz",
  pb: "peabody",
  c: "chacha",
  r: "rumba",
  sw: "swing",
  b: "bolero",
  m: "mambo",
  sal: "salsa",
  me: "merengue",
  ba: "bachata",
  h: "hustle",
  wcs: "west coast swing",
  sam: "samba",
  pd: "paso doble",
  ta: "argentine tango",
  mi: "milonga",
  tv: "tango vals",
  q: "quickstep",
  s: "samba",
  j: "jive",
  wtf: "waltz/tango/foxtrot",
  crsw: "chacha/rumba/swing",
  crs: "chacha/rumba/samba",
  wtfvw: "Waltz/Tango/Foxtrot/Viennese Waltz",
  crswbm: "Chacha/Rumba/Swing/Bolero/Mambo",
  wtvwfq: "Waltz/Tango/Viennese Waltz/Foxtrot/Quickstep",
  csrpj: "Chacha/Samba/Rumba/Paso Doble/Jive",
};

// summary data
export const summaryDeadlines = [
  "avant le 6 août",
  "à partir du 6 août",
  "2023, 08, 6",
];

export const early = () => {
  const today = new Date();
  const deadline = new Date(summaryDeadlines[2]);
  return today <= deadline ? true : false;
};

export const summaryCategories = [
  "bigSide|FRAIS D'INCRIPTION|0",
  "summarySide|PRO-AM|8",
  "Adulte(16+) Danse Individuelle| x 35 $can = | x 40 $can = |Pro/Am 1 Danse|1|single|paSDAgeGroups|PRO-AM",
  "Adulte(16+) Multi 3 danses| x 45 $can = | x 50 $can = |Pro/Am Multi Danse|1|champ|paChampAgeGroups|PRO-AM",
  "Adulte(16+) Bourse d'étude| x 65 $can = | x 70 $can = |Pro/Am Multi Danse|1|schol|paScholAgeGroups|PRO-AM",
  "Junior(15-) Danse Individuelle| x 15 $can = | x 20 $can = |Pro/Am 1 Danse|0|single|paSDAgeGroups|PRO-AM",
  "Junior(15-) Multi 3 danses| x 20 $can = | x 25 $can = |Pro/Am Multi Danse|0|champ|paChampAgeGroups|PRO-AM",
  "Junior(15-) Bourse d'étude| x 30 $can = | x 35 $can = |Pro/Am Multi Danse|0|schol|paScholAgeGroups|PRO-AM",
  "Démonstration en solo (Adulte & Junior)| x 50 $can = | x 55 $can = |Pro/Am Multi Danse|1|solo|paSolosAgeGroups|PRO-AM",
  "summaryEmpty",
  "summarySide|AMATEUR|16",
  "Adulte(16+) Couple / chaque catégorie| x 35 $can = | x 40 $can = |Amateur Couple|1|amCpl|amCplAges|AMATEUR",
  "Adulte(16+) Cabaret| x 35 $can = | x 40 $can = |Amateur Couple|1|cabaret|amCplAges|AMATEUR",
  "Adulte(19+) Amateur Mixte Danse Individuelle| x 35 $can = | x 40 $can = |Amateur Mix|1|mix1D|mixAges|AMATEUR",
  "Adulte(19+) Amateur Mixte Multi 3 danses| x 45 $can = | x 50 $can = |Amateur Mix|1|mix3D|mixAges|AMATEUR",
  "Adulte(19+) Amateur Mixte Multi 5 danses| x 65 $can = | x 70 $can = |Amateur Mix|1|mix5D|mixAges|AMATEUR",
  "Adulte(19+) Amateur Solo / Chaque danse| x 10 $can = | x 15 $can = |Amateur Solo|1|solo1D|solo1DAges|AMATEUR",
  "Adulte(19+) Amateur Solo / Multi danses| x 20 $can = | x 25 $can = |Amateur Solo|1|soloMulti|soloMultiAges|AMATEUR",
  "Juvénile & Junior Couple / chaque catégorie| x 20 $can = | x 25 $can = |Amateur Couple|0|amCpl|amCplAges|AMATEUR",
  "Juvénile, Junior & Jeunesse Amateur Mixte Danse Individuelle| x 10 $can = | x 10 $can = |Amateur Mix|0|mix1D|mixAges|AMATEUR",
  "Juvénile, Junior & Jeunesse Amateur Mixte Multi| x 20 $can = | x 20 $can = |Amateur Mix|0|mixMulti|mixAges|AMATEUR",
  "Juvénile, Junior & Jeunesse Amateur Solo / Chaque danse| x 10 $can = | x 15 $can = |Amateur Solo|0|solo1D|solo1DAges|AMATEUR",
  "Juvénile, Junior & Jeunesse Amateur Solo / Multi 3 danses| x 20 $can = | x 25 $can = |Amateur Solo|0|soloMulti|soloMultiAges|AMATEUR",
  "Juvénile & Junior Amateur pré-compétitif / Couple| x 20 $can = | x 20 $can = |Amateur Pré-Compétitif|0|preComp1DCpl|preComp1DAges|AMATEUR",
  "Juvénile & Junior Amateur pré-compétitif / Simple| x 10 $can = | x 10 $can = |Amateur Pré-Compétitif|0|preComp1DSolo|preCompMultiAges|AMATEUR",
  "Formation d'équipe| x 65 $can = | x 75 $can = |Formation|1|formation|formAges|AMATEUR",
  "summaryEmpty",
  "summarySide|PRO|3",
  "Chaque catégorie| x 110 $can = | x 125 $can = |Pro|1|pro|proAges|PRO",
  "Exhibition| x 85 $can = | x 95 $can = |Pro|1|exhibition|proAges|PRO",
  "summaryEmpty",
  "summarySide|BILLETS|9",
  "BILLETS VENDREDI%1ère RANGÉE TABLE| x 70 $can = | x 75 $can = |Tickets|1|friday|ticketAges|BILLETS",
  "%2e RANGÉE| x 55 $can = | x 60 $can = |Tickets|2|friday|ticketAges|BILLETS",
  "%Juvénile + Junior 15 & -| x 25 $can = | x 30 $can = |Tickets|0|friday|ticketAges|BILLETS",
  "BILLETS SAMEDI%1ère RANGÉE| x 70 $can = | x 75 $can = |Tickets|1|saturday|ticketAges|BILLETS",
  "%2e RANGÉE| x 55 $can = | x 60 $can = |Tickets|2|saturday|ticketAges|BILLETS",
  "%Juvénile + Junior 15 & -| x 25 $can = | x 30 $can = |Tickets|0|saturday|ticketAges|BILLETS",
  "BILLETS DIMANCHE%Adulte| x 25 $can = | x 30 $can = |Tickets|1|sunday|ticketAges|BILLETS",
  "%Juvénile + Junior 15 & -| x 20 $can = | x 25 $can = |Tickets|0|sunday|ticketAges|BILLETS",
  "summaryEmpty",
];

export const summaryTableFootNote =
  "Tous les compétiteurs doivent se procurer un billet d'admission pour avoir accès au ballroom";

// countries, states & provinces
export const countries = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Sint Eustatius & Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos Islands",
  "Colombia",
  "Comoros (the)",
  "Congo (Democratic Republic)",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia (Asia)",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard & McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Minor Outlying Islands",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent, Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia, South Sandwich Isl.",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands (U.K.)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "American Samoa",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Trust Territories",
  "Utah",
  "Vermont",
  "Virginia",
  "Virgin Islands",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const provinces = [
  "Alberta",
  "Colombie Britannique",
  "Île du Prince Édouard",
  "Manitoba",
  "Nouveau Brunswick",
  "Nouvelle Écosse",
  "Nunavut",
  "Ontario",
  "Québec",
  "Saskatchewan",
  "Terre Neuve et Labrador",
  "Territoires du Nord Ouest",
  "Yukon",
];

export const statesAbbr = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "CM",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const provAbbr = [
  "AB",
  "BC",
  "PE",
  "MB",
  "NB",
  "NS",
  "NU",
  "ON",
  "QC",
  "SK",
  "NL",
  "NT",
  "YT",
];
