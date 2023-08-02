export const add_member_fields = [
  {
    id: 1,
    field_name: "forename",
    field_type: "text",
    field_value: "forename",
    field_label: "Forename",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      maxLength: {
        value: 30,
        message: "30 characters max",
      },
    },
  },
  {
    id: 2,
    field_name: "surname",
    field_type: "text",
    field_value: "surname",
    field_label: "Surname",
  },
  {
    id: 3,
    field_name: "irish_forename",
    field_type: "text",
    field_value: "irish_forename",
    field_label: "Irish Forename",
  },
  {
    id: 4,
    field_name: "irish_surname",
    field_type: "text",
    field_value: "irish_surname",
    field_label: "Irish Surname",
  },
  {
    id: 5,
    field_name: "gender",
    field_type: "radio",
    field_value: "gender",
    field_label: "Gender",
    options: [
      { id: 1, name: "male", label: "Male" },
      { id: 2, name: "female", label: "Female" },
    ],
  },
  {
    id: 6,
    field_name: "dob",
    field_type: "date",
    field_value: "dob",
    field_label: "DOB",
  },
  {
    id: 7,
    field_name: "address1",
    field_type: "text",
    field_value: "address1",
    field_label: "Address1",
  },
  {
    id: 8,
    field_name: "address2",
    field_type: "text",
    field_value: "address2",
    field_label: "Address2",
  },
  {
    id: 9,
    field_name: "town",
    field_type: "text",
    field_value: "town",
    field_label: "Town",
  },
  {
    id: 10,
    field_name: "county",
    field_type: "select",
    field_value: "county",
    field_label: "County",
    placeholder: "Please select a county",
    select_values: [
      { id: 1, name: "Antrim" },
      { id: 2, name: "Armagh" },
      { id: 3, name: "Carlow" },
      { id: 4, name: "Cavan" },
      { id: 5, name: "Clare" },
      { id: 6, name: "Cork" },
      { id: 7, name: "Derry" },
      { id: 8, name: "Donegal" },
      { id: 9, name: "Down" },
      { id: 10, name: "Dublin" },
      { id: 11, name: "Fermanagh" },
      { id: 12, name: "Galway" },
      { id: 13, name: "Kerry" },
      { id: 14, name: "Kildare" },
      { id: 15, name: "Kilkenny" },
      { id: 16, name: "Laois" },
      { id: 17, name: "Leitrim" },
      { id: 18, name: "Limerick" },
      { id: 19, name: "Longford" },
      { id: 20, name: "Louth" },
      { id: 21, name: "Mayo" },
      { id: 22, name: "Meath" },
      { id: 23, name: "Monaghan" },
      { id: 24, name: "Offaly" },
      { id: 25, name: "Roscommon" },
      { id: 26, name: "Sligo" },
      { id: 27, name: "Tipperary" },
      { id: 28, name: "Tyrone" },
      { id: 29, name: "Waterford" },
      { id: 30, name: "Westmeath" },
      { id: 31, name: "Wexford" },
      { id: 32, name: "Wicklow" },
    ],
  },
  {
    id: 11,
    field_name: "country",
    field_type: "select",
    field_value: "country",
    field_label: "Country",
    placeholder: "Please select a country",
    select_values: [
      { id: 1, name: "Ireland" },
      { id: 2, name: "United Kingdom" },
      { id: 3, name: "United States" },
      { id: 4, name: "Afghanistan" },
      { id: 5, name: "Albania" },
      { id: 6, name: "Algeria" },
      { id: 7, name: "Andorra" },
      { id: 8, name: "Angola" },
      { id: 9, name: "Antigua and Barbuda" },
      { id: 10, name: "Argentina" },
      { id: 11, name: "Armenia" },
      { id: 12, name: "Austria" },
      { id: 13, name: "Azerbaijan" },
      { id: 14, name: "Bahrain" },
      { id: 15, name: "Bangladesh" },
      { id: 16, name: "Barbados" },
      { id: 17, name: "Belarus" },
      { id: 18, name: "Belgium" },
      { id: 19, name: "Belize" },
      { id: 20, name: "Benin" },
      { id: 21, name: "Bhutan" },
      { id: 22, name: "Bolivia" },
      { id: 23, name: "Bosnia and Herzegovina" },
      { id: 24, name: "Botswana" },
      { id: 25, name: "Brazil" },
      { id: 26, name: "Brunei" },
      { id: 27, name: "Bulgaria" },
      { id: 28, name: "Burkina Faso" },
      { id: 29, name: "Burundi" },
      { id: 30, name: "Cabo Verde" },
      { id: 31, name: "Cambodia" },
      { id: 32, name: "Cameroon" },
      { id: 33, name: "Canada" },
      { id: 34, name: "Central African Republic" },
      { id: 35, name: "Chad" },
      { id: 36, name: "Channel Islands" },
      { id: 37, name: "Chile" },
      { id: 38, name: "China" },
      { id: 39, name: "Colombia" },
      { id: 40, name: "Comoros" },
      { id: 41, name: "Congo" },
      { id: 42, name: "Costa Rica" },
      { id: 43, name: "Côte d'Ivoire" },
      { id: 44, name: "Croatia" },
      { id: 45, name: "Cuba" },
      { id: 46, name: "Cyprus" },
      { id: 47, name: "Czech Republic" },
      { id: 48, name: "Denmark" },
      { id: 49, name: "Djibouti" },
      { id: 50, name: "Dominica" },
      { id: 51, name: "Dominican Republic" },
      { id: 52, name: "DR Congo" },
      { id: 53, name: "Ecuador" },
      { id: 54, name: "Egypt" },
      { id: 55, name: "El Salvador" },
      { id: 56, name: "Equatorial Guinea" },
      { id: 57, name: "Eritrea" },
      { id: 58, name: "Estonia" },
      { id: 59, name: "Eswatini" },
      { id: 60, name: "Ethiopia" },
      { id: 61, name: "Faeroe Islands" },
      { id: 62, name: "Finland" },
      { id: 63, name: "France" },
      { id: 64, name: "French Guiana" },
      { id: 65, name: "Gabon" },
      { id: 66, name: "Gambia" },
      { id: 67, name: "Georgia" },
      { id: 68, name: "Germany" },
      { id: 69, name: "Ghana" },
      { id: 70, name: "Gibraltar" },
      { id: 71, name: "Greece" },
      { id: 72, name: "Grenada" },
      { id: 73, name: "Guatemala" },
      { id: 74, name: "Guinea" },
      { id: 75, name: "Guinea-Bissau" },
      { id: 76, name: "Guyana" },
      { id: 77, name: "Haiti" },
      { id: 78, name: "Holy See" },
      { id: 79, name: "Honduras" },
      { id: 80, name: "Hong Kong" },
      { id: 81, name: "Hungary" },
      { id: 82, name: "Iceland" },
      { id: 83, name: "India" },
      { id: 84, name: "Indonesia" },
      { id: 85, name: "Iran" },
      { id: 86, name: "Iraq" },
      { id: 87, name: "Isle of Man" },
      { id: 88, name: "Israel" },
      { id: 89, name: "Italy" },
      { id: 90, name: "Jamaica" },
      { id: 91, name: "Japan" },
      { id: 92, name: "Jordan" },
      { id: 93, name: "Kazakhstan" },
      { id: 94, name: "Kenya" },
      { id: 95, name: "Kuwait" },
      { id: 96, name: "Kyrgyzstan" },
      { id: 97, name: "Laos" },
      { id: 98, name: "Latvia" },
      { id: 99, name: "Lebanon" },
      { id: 100, name: "Lesotho" },
      { id: 101, name: "Liberia" },
      { id: 102, name: "Libya" },
      { id: 103, name: "Liechtenstein" },
      { id: 104, name: "Lithuania" },
      { id: 105, name: "Luxembourg" },
      { id: 106, name: "Macao" },
      { id: 107, name: "Madagascar" },
      { id: 108, name: "Malawi" },
      { id: 109, name: "Malaysia" },
      { id: 110, name: "Maldives" },
      { id: 111, name: "Mali" },
      { id: 112, name: "Malta" },
      { id: 113, name: "Mauritania" },
      { id: 114, name: "Mauritius" },
      { id: 115, name: "Mayotte" },
      { id: 116, name: "Mexico" },
      { id: 117, name: "Moldova" },
      { id: 118, name: "Monaco" },
      { id: 119, name: "Mongolia" },
      { id: 120, name: "Montenegro" },
      { id: 121, name: "Morocco" },
      { id: 122, name: "Mozambique" },
      { id: 123, name: "Myanmar" },
      { id: 124, name: "Namibia" },
      { id: 125, name: "Nepal" },
      { id: 126, name: "Netherlands" },
      { id: 127, name: "Nicaragua" },
      { id: 128, name: "Niger" },
      { id: 129, name: "Nigeria" },
      { id: 130, name: "North Korea" },
      { id: 131, name: "North Macedonia" },
      { id: 132, name: "Norway" },
      { id: 133, name: "Oman" },
      { id: 134, name: "Pakistan" },
      { id: 135, name: "Panama" },
      { id: 136, name: "Paraguay" },
      { id: 137, name: "Peru" },
      { id: 138, name: "Philippines" },
      { id: 139, name: "Poland" },
      { id: 140, name: "Portugal" },
      { id: 141, name: "Qatar" },
      { id: 142, name: "Réunion" },
      { id: 143, name: "Romania" },
      { id: 144, name: "Russia" },
      { id: 145, name: "Rwanda" },
      { id: 146, name: "Saint Helena" },
      { id: 147, name: "Saint Kitts and Nevis" },
      { id: 148, name: "Saint Lucia" },
      { id: 149, name: "Saint Vincent and the Grenadines" },
      { id: 150, name: "San Marino" },
      { id: 151, name: "Sao Tome & Principe" },
      { id: 152, name: "Saudi Arabia" },
      { id: 153, name: "Senegal" },
      { id: 154, name: "Serbia" },
      { id: 155, name: "Seychelles" },
      { id: 156, name: "Sierra Leone" },
      { id: 157, name: "Singapore" },
      { id: 158, name: "Slovakia" },
      { id: 159, name: "Slovenia" },
      { id: 160, name: "Somalia" },
      { id: 161, name: "South Africa" },
      { id: 162, name: "South Korea" },
      { id: 163, name: "South Sudan" },
      { id: 164, name: "Spain" },
      { id: 165, name: "Sri Lanka" },
      { id: 166, name: "State of Palestine" },
      { id: 167, name: "Sudan" },
      { id: 168, name: "Suriname" },
      { id: 169, name: "Sweden" },
      { id: 170, name: "Switzerland" },
      { id: 171, name: "Syria" },
      { id: 172, name: "Taiwan" },
      { id: 173, name: "Tajikistan" },
      { id: 174, name: "Tanzania" },
      { id: 175, name: "Thailand" },
      { id: 176, name: "The Bahamas" },
      { id: 177, name: "Timor-Leste" },
      { id: 178, name: "Togo" },
      { id: 179, name: "Trinidad and Tobago" },
      { id: 180, name: "Tunisia" },
      { id: 181, name: "Turkey" },
      { id: 182, name: "Turkmenistan" },
      { id: 183, name: "Uganda" },
      { id: 184, name: "Ukraine" },
      { id: 185, name: "United Arab Emirates" },
      { id: 186, name: "Uruguay" },
      { id: 187, name: "Uzbekistan" },
      { id: 188, name: "Venezuela" },
      { id: 189, name: "Vietnam" },
      { id: 190, name: "Western Sahara" },
      { id: 191, name: "Yemen" },
      { id: 192, name: "Zambia" },
      { id: 193, name: "Zimbabwe" },
    ],
  },
  {
    id: 12,
    field_name: "postcode",
    field_type: "text",
    field_value: "postcode",
    field_label: "Postcode",
  },
  {
    id: 13,
    field_name: "phone_number",
    field_type: "tel",
    field_value: "phone_number",
    field_label: "Phone Number",
  },
  {
    id: 14,
    field_name: "email",
    field_type: "email",
    field_value: "email",
    field_label: "Email",
  },
  {
    id: 15,
    field_name: "association",
    field_type: "checkbox",
    field_value: "association",
    field_label: "Association",
    options: [
      {
        id: 1,
        name: "gaa",
        label: "GAA",
        message: "All male players and all non playing members",
      },
      {
        id: 2,
        name: "lgfa",
        label: "LGFA",
        message: "All ladies football players, coaches and committee members",
      },
      {
        id: 3,
        name: "camogie",
        label: "Camogie",
        message: "All Camogie players, coaches and committee members",
      },
    ],
  },
  {
    id: 16,
    field_name: "membership_type",
    field_type: "select",
    field_value: "membership_type",
    field_label: "Membership Type",
    select_values: [
      { id: 1, name: "Playing member" },
      { id: 2, name: "Non playing member" },
    ],
  },
  {
    id: 17,
    field_name: "player",
    field_type: "radio",
    field_value: "player",
    field_label: "Player",
    message: "Please select",
    options: [
      { id: 1, name: "yes", label: "Yes" },
      { id: 2, name: "no", label: "No" },
    ],
  },
  // {
  //   id: 18,
  //   field_name: "parental_consent",
  //   field_type: "checkbox",
  //   field_value: "parental_consent",
  //   field_label: "Parental Consent",
  // },
];