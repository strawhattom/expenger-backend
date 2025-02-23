import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';

/**
 * Update User Input
 */
export class UpdateUserInput extends PartialType(CreateUserInput) {
  /**
   * User ID
   */
  id: number;
}
