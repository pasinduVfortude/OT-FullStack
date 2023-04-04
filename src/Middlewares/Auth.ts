import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/userTS';
import { UserRepository } from '../repository/userTS';

const secret = "een2jjnJNIUEJFNSUDFJNDSnkjs";

export class Auth {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async verifyToken(token: string): Promise<any> {
      // Remove "Bearer" from the token string
      const Token = token.replace('Bearer ', '');
      try {
        // Verify the JWT
        const decoded = jwt.verify(Token, secret);
        const email = (decoded as JwtPayload).email;
        // console.log(email);
        // Check if the user still exists in the database
        const user = await this.userRepository.findUser(email);
        if (!user) {
            throw new Error("User not found");
        }else{
            console.log("verified")
            // Return the user
            return user;
        }
        
      } catch(err) {
        // If the JWT is invalid or has been tampered with, an exception will be thrown
        console.error(err);
      }
   
  }
}
