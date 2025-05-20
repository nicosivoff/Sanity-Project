// src/app/service/sanity.service.ts

import { Injectable } from '@angular/core';
import createClient from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import { Actor } from '../models/interfaces/actor';
import { Movie } from '../models/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class SanityService {
  constructor() { }

  
  sanityClientCredentials = createClient({
  projectId: '56mxkjts',
  dataset: 'production',
  useCdn: true,
});

  urlFor = (source: any) =>
  imageUrlBuilder(this.sanityClientCredentials).image(source);

  async getMovies(): Promise<Movie[]> {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "movie"]{
        _id,
    title,
    overview,
    releaseDate,
    poster
  }`
    );
  }

  async getActors(): Promise<Actor[]> {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "person"]{
        _id,
    name,
    image
  }`
    );
  }
}