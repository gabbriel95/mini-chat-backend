import { Controller, Body, Post, Patch } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { FriendshipsService } from './friendships.service';

@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post()
  createFriendship(@Body() createFriendshipDto: CreateFriendshipDto) {
    return this.friendshipsService.createFriendship(createFriendshipDto);
  }

  @Patch()
  updateFriendship(@Body() updateFriendshipDto: UpdateFriendshipDto) {
    return this.friendshipsService.updateFriendship(updateFriendshipDto);
  }
}
