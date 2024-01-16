import { FridgeOwner } from './fridgeOwner.dto';

export class FridgeDto {
  id: string;
  name?: string;
  owners: FridgeOwner[];
}
