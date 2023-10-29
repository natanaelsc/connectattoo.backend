import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class GetUserService {
    constructor(private readonly userRepository: UserRepository) {}
    
    async getByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }
}
