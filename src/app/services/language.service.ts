import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apiUrl = 'http://localhost:3000/api/languages'; // URL de la API

  constructor(private http: HttpClient) { }

  // CREATE
  createLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(this.apiUrl, language);
  }

  // READ (Todos los idiomas)
  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.apiUrl);
  }

  // READ (Un solo idioma por ID)
  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateLanguage(id: number, language: Language): Observable<Language> {
    return this.http.put<Language>(`${this.apiUrl}/${id}`, language);
  }

  // DELETE
  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
