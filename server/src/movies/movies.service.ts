import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';

export interface PaginatedMovies {
  data: Movie[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async create(createMovieDto: CreateMovieDto, userId: string, fileUrl?: string): Promise<Movie> {
    const movieData = {
      title: createMovieDto.title,
      description: createMovieDto.description,
      releaseDate: createMovieDto.releaseDate ? new Date(createMovieDto.releaseDate) : undefined,
      rating: createMovieDto.rating,
      imageUrl: fileUrl, // Can be image or video URL
      userId,
    };

    const createdMovie = new this.movieModel(movieData);
    return createdMovie.save();
  }

  async findAll(query: QueryMoviesDto, userId: string): Promise<PaginatedMovies> {
    const { page = 1, limit = 8, search } = query;
    const skip = (page - 1) * limit;

    const filter: any = { userId };
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const [movies, total] = await Promise.all([
      this.movieModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('userId', 'email')
        .exec(),
      this.movieModel.countDocuments(filter).exec(),
    ]);

    return {
      data: movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string): Promise<Movie> {
    const movie = await this.movieModel
      .findOne({ _id: id, userId })
      .populate('userId', 'email')
      .exec();

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto, userId: string, fileUrl?: string): Promise<Movie> {
    // Check if movie exists and belongs to user
    await this.findOne(id, userId);

    const updateData: any = {};
    if (updateMovieDto.title) updateData.title = updateMovieDto.title;
    if (updateMovieDto.description !== undefined) updateData.description = updateMovieDto.description;
    if (updateMovieDto.releaseDate) updateData.releaseDate = new Date(updateMovieDto.releaseDate);
    if (updateMovieDto.rating !== undefined) updateData.rating = updateMovieDto.rating;
    if (fileUrl) updateData.imageUrl = fileUrl; // Can be image or video URL

    return this.movieModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('userId', 'email')
      .exec();
  }

  async remove(id: string, userId: string): Promise<Movie> {
    // Check if movie exists and belongs to user
    await this.findOne(id, userId);

    return this.movieModel.findByIdAndDelete(id).exec();
  }
} 