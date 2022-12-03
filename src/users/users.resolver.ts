import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Query(() => Int)
  getUsersCount(): Promise<number> {
    return this.usersService.getUsersCount();
  }

  @Query(() => User, { nullable: true })
  getUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  @Mutation(() => Boolean)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<boolean> {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
}
