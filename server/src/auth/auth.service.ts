import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user: Omit<User, 'password'>;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userDoc = user as any; // Cast to access Mongoose document properties
    const payload: JwtPayload = { sub: userDoc._id.toString(), email: user.email };
    const access_token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = userDoc.toObject();
    return {
      access_token,
      user: userWithoutPassword,
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    // Create new user
    const user = await this.usersService.create(registerDto);
    
    const userDoc = user as any; // Cast to access Mongoose document properties
    const payload: JwtPayload = { sub: userDoc._id.toString(), email: user.email };
    const access_token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = userDoc.toObject();
    return {
      access_token,
      user: userWithoutPassword,
    };
  }

  async validateJwtPayload(payload: JwtPayload): Promise<User | null> {
    return this.usersService.findOne(payload.sub);
  }
} 