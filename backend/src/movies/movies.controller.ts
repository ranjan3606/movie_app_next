import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { MoviesService, PaginatedMovies } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Movie } from '../schemas/movie.schema';

@ApiTags('Movies')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Movie created successfully',
  })
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: any, // Cloudinary file type
    @Request() req: any,
  ): Promise<Movie> {
    const fileUrl = file ? file.path : undefined; // Cloudinary URL
    return this.moviesService.create(createMovieDto, req.user._id.toString(), fileUrl);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Movies retrieved successfully',
  })
  async findAll(
    @Query() query: QueryMoviesDto,
    @Request() req: any,
  ): Promise<PaginatedMovies> {
    return this.moviesService.findAll(query, req.user._id.toString());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found',
  })
  async findOne(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Movie> {
    return this.moviesService.findOne(id, req.user._id.toString());
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update a movie' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file: any, // Cloudinary file type
    @Request() req: any,
  ): Promise<Movie> {
    const fileUrl = file ? file.path : undefined; // Cloudinary URL
    return this.moviesService.update(id, updateMovieDto, req.user._id.toString(), fileUrl);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({
    status: 200,
    description: 'Movie deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found',
  })
  async remove(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Movie> {
    return this.moviesService.remove(id, req.user._id.toString());
  }
} 