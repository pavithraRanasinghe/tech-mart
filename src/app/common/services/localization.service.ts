import { Injectable } from '@angular/core';
import {sw} from '../constants/sw';
import {en} from '../constants/en';

export enum SupportedLanguages {
  english = 'en',
  swedish = 'sw'
}

const DEFAULT_LANGUAGE = SupportedLanguages.english;

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private _selectedLanguage: string;
  private _keys;

  constructor() {
    const selectedLanguage = localStorage.getItem('dh_language');
    this._selectedLanguage = selectedLanguage ? selectedLanguage : DEFAULT_LANGUAGE;
    this._keys = this._selectedLanguage === SupportedLanguages.english ? en : sw;
  }

  get selectedLanguage(): string {
    return this._selectedLanguage;
  }

  get keys() {
    return this._keys;
  }

  toggleLanguage(): void {
    if (this._selectedLanguage === SupportedLanguages.english) {
      this._selectedLanguage = SupportedLanguages.swedish;
      this._keys = sw;
      localStorage.setItem('dh_language', SupportedLanguages.swedish);
    } else {
      this._selectedLanguage = SupportedLanguages.english;
      this._keys = en;
      localStorage.setItem('dh_language', SupportedLanguages.english);
    }
  }
}
