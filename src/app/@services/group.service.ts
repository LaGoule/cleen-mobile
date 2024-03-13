import { Injectable } from '@angular/core';
import { iGroup, iUser } from '../@interfaces/interfaces';
import { FirestoreService } from './firestore.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public activeGroup: string = '';

  constructor(
    private readonly _firestoreService: FirestoreService,
  ) {}

  async createGroup(group: iGroup): Promise<string> {
    return this._firestoreService.addGroup(group);
  }

  async handleLogin(activeUser: iUser) {
    // If user has no groups, create a new one and set it as active
    if (!activeUser.groups) {
      this.createAndSetGroup(activeUser);
      return;
    }
  
    // If user has no active group, update the user to add groups object
    if (!activeUser.groups.active) {
      await this.initializeUserGroups(activeUser);
      return;
    }
  
    // If user has an active group, set service group to user's active group
    this.setActiveGroup(activeUser, activeUser.groups.active);
  }
  
  async createAndSetGroup(activeUser: iUser) {
    console.log('User has no group, let\'s create one!');
    const newGroup: iGroup = {
      id: '', // This will be replaced by the actual ID
      displayName: 'Home',
      admins: [activeUser.uid],
      users: [activeUser.uid]
    };
    const groupId = await this.createGroup(newGroup); // Get the new group ID
    this.setUserAsGroupMember(activeUser, groupId);
    this.setUserAsGroupAdmin(activeUser, groupId);
    this.setActiveGroup(activeUser, groupId);
    console.log('Group created, User is now in a group');
  }
  
  async initializeUserGroups(activeUser: iUser) {
    console.log('User has no active group');
    await this._firestoreService.updateUser(activeUser.uid, {
      groups: { active: '', admin: [], member: [] }
    });
  }

  setActiveGroup(user: iUser, groupId: string): void {
    this._firestoreService.updateUser(user.uid, {
      groups: { active: groupId }
    });
    this.activeGroup = groupId;
    console.log('Group set in service: ', this.activeGroup);
  }

  setUserAsGroupAdmin(user: iUser, groupId: string): void {
    this._firestoreService.updateUser(user.uid, {
      groups: { admin: [groupId] }
    });
  }

  setUserAsGroupMember(user: iUser, groupId: string): void {
    this._firestoreService.updateUser(user.uid, {
      groups: { member: [groupId] }
    });
  }

  doesUserHasGroup(user: iUser): boolean {
    if(!user.groups) return false;
    if(!user.groups.member) return false;
    if(user.groups.member.length > 0) return true;
    return false;
  }

  doesUserHasActiveGroup(user: iUser): boolean {
    if(!user.groups) return false;
    return user.groups.active !== null;
  }

  isUserInGroup(user: iUser, groupId: string): boolean {
    if(!user.groups) return false;
    if(!user.groups.member) return false;
    return user.groups.member.includes(groupId);
  }

}
