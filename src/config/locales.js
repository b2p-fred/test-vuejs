/**
 * Set a list of countries and their languages
 * ---
 * Set default = true for the default country / language
 * Set disabled = true to disable a country and/or language
 *
 * If a country is defined in a language it is used for the country label
 *  As an example, you should define these 2 languages for Belgium:
 *  languages: [
 *    { code: 'nl-BE', flag: 'be', country: 'Belgie', label: 'Nederlands' },
 *    { code: 'fr-FR', flag: 'be', country: 'Belgique', label: 'Français' }
 *  ]
 */
class Locales {
  constructor() {
    this.locales = [
      {
        code: "fr",
        label: "France",
        default: true,
        languages: [
          {
            direction: "ltr",
            code: "fr-FR",
            flag: "fr",
            label: "Français",
            countryLabel: "France",
          },
        ],
      },
      {
        code: "en",
        label: "Great Britain",
        languages: [
          {
            direction: "ltr",
            code: "en-gb",
            flag: "uk",
            label: "English",
            countryLabel: "Great Britain",
          },
        ],
      },
      {
        disabled: true,
        code: "de",
        label: "Deutschland",
        languages: [
          {
            direction: "ltr",
            code: "de-de",
            flag: "de",
            label: "Deutsch",
            countryLabel: "Deutschland",
          },
        ],
      },
      {
        disabled: false,
        code: "es",
        label: "España",
        languages: [
          {
            direction: "ltr",
            code: "es-ES",
            flag: "es",
            label: "Español",
            countryLabel: "España",
          },
        ],
      },
      {
        disabled: true,
        code: "be",
        label: "Belgique",
        languages: [
          {
            direction: "ltr",
            code: "fr-be",
            flag: "be",
            label: "Belge",
            countryLabel: "Belgique",
          },
          {
            direction: "ltr",
            code: "nl-be",
            flag: "be",
            label: "Nederlands",
            countryLabel: "België",
          },
          {
            direction: "ltr",
            code: "de-be",
            flag: "be",
            label: "Deutsch",
            countryLabel: "Belgien",
          },
        ],
      },
      {
        disabled: true,
        code: "ma",
        label: "العربية",
        languages: [
          {
            direction: "rtl",
            code: "ar-ma",
            locale: "ar",
            flag: "ma",
            label: "العربية",
          },
        ],
      },
    ];
  }

  /**
   * Get the enabled countries
   *
   * @returns {*[]}
   */
  getCountries() {
    const enabledCountries = [];

    for (const country of this.locales) {
      // disabled country
      if (country.disabled !== undefined && country.disabled) {
        continue;
      }
      enabledCountries.push(country);
    }
    return enabledCountries;
  }

  /**
   * Get the enabled languages
   * if no country code is required, then all the enabled languages of all the
   * enabled countries will be returned.
   *
   * @param requiredCountry   the country code of a specific country to consider
   * @returns {*[]}
   */
  getLanguages(requiredCountry = null) {
    const enabledLanguages = [];

    for (const country of this.locales) {
      // disabled country
      if (country.disabled !== undefined && country.disabled) {
        continue;
      }
      if (requiredCountry && requiredCountry !== country.code) {
        continue;
      }

      // disabled country
      for (const language of country.languages) {
        // disabled language
        if (language.disabled !== undefined && language.disabled) {
          continue;
        }
        enabledLanguages.push(language);
      }
    }
    return enabledLanguages;
  }
}
export default new Locales();
