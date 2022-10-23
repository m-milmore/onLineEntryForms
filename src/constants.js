import LOGO from "./assets/images/logo.png";
import DATES from "./assets/images/dates.png";
import EYE_ICON from "./assets/images/eye-icon.png";
import EYE_ICON_HIDE from "./assets/images/eye-icon-hide.png";

export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

export const logo = LOGO;
export const dates = DATES;

export const INIT_MSG = "msg"

export const EYE_ICONS = {
  SHOW: EYE_ICON,
  HIDE: EYE_ICON_HIDE,
};

export const disclaimer = `L'organisateur n'est pas tenu responsable en cas de perte ou de vol d'articles 
personnels laissés dans les vestiaires, salle de bal ou chambre d'hôtel. L'organisateur ne peut être tenu 
responsable des blessures subies par les personnes suivantes : compétiteurs, spectateurs, employés, officiels, 
vendeurs, bénévoles ou tout autre personne assistant à l'évènement. Chacun y participe à ses risques et périls. 
Les organisateurs se réservent le droit d'annuler ou de refuser l'inscription d'un compétiteur ayant manqué 
de respect envers les officiels ou le personnel travaillant pour le Championnat Canadien National, et 
ne se conformant pas au présent règlement.`;

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
}
