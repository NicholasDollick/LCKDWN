interface Blacklistable {
  blacklist: boolean;
}

interface Page extends Blacklistable {
  url: string;
};

interface UrlPattern extends Blacklistable {
  regex: RegExp;
};

export default class Domain {
  domain: string;
  blacklist: boolean;
  patterns: UrlPattern[];
  pages: Page[];

  constructor(domain: string = '', blacklist: boolean = true, patterns: UrlPattern[] = [], pages: Page[] = []) {
    this.domain = domain;
    this.blacklist = blacklist;
    this.patterns = patterns;
    this.pages = pages;
  }

  addPage(page: Page) {
    if (this.isValidUrl(page.url)) {
      return this.pages.push(page);
    }

    return false;
  }

  isValidUrl(url: string): boolean {
    return (/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/).test(url);
  }

  isValid(): string[] | boolean {
    let errors: string[];
    this.isValidUrl(this.domain)? '' : errors.push('domain');

    // return errors array if invalid, otherwise return true
    return !errors || errors;
  }
};