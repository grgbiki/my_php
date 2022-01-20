import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhpApiServiceService {
  baseUrl: string = "http://localhost:4343/api/";

  constructor() { }
}
