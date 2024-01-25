import { ProfileDto } from '../profile/profile.dto';

export class UserDto {
  id: string;
  email: string;
  profile: ProfileDto;
}
