import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlugifyService {

  constructor() { }

  slugify(term = ''){
    return term.toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');
  }
}
