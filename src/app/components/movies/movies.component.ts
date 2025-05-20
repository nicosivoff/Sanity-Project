// src/app/movies/movies.component.ts

import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/interfaces/movie';
import { SanityService } from '../../services/sanity.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  imports: [CommonModule]
})

export class MoviesComponent implements OnInit {
  constructor(private sanityService: SanityService ) { }

  movies: Movie[] = [];

  imageUrl(source: any) {
    return this.sanityService.urlFor(source);
  }

  ngOnInit(): void {
    this.getMovies();
  }

  async getMovies(): Promise<Movie[]>  {
    this.movies = await this.sanityService.getMovies();
    return this.movies;
  }
}