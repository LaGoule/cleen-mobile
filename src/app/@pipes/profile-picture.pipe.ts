import { Pipe, PipeTransform, inject } from '@angular/core';
import { FirestoreService } from '../@services/firestore.service';

@Pipe({
  name: 'profilePicture',
  standalone: true,
})
export class ProfilePicturePipe implements PipeTransform {
  constructor(
    private readonly _firestoreService: FirestoreService,
  ) {}

  async transform(userId: string): Promise<string> {
    const user = await this._firestoreService.getUser(userId);
    if (!user.photoURL) {
      throw new Error('User must have a photoURL');
    }
    const avatarUrl = user.photoURL;
    return avatarUrl;
  }
}
