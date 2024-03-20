import { Injectable } from '@angular/core';
import { iGroup, iUser } from '../@interfaces/interfaces';
import { FirestoreService } from './firestore.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

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
    // If user has no active group
    else if (!activeUser.groups.active) {
      console.log('User has no active group,');
      if (activeUser.groups.member?.length === 0) {
        console.log('User has isnt part of any group, let\'s create one!');
        await this.createAndSetGroup(activeUser);
      } else if (activeUser.groups.member) {
        console.log('User is part of groups, but none is active, setting first group as active');
        this.setActiveGroup(activeUser, activeUser.groups.member[0]);
      }
      return;
    }
    // If user has active group, set it as active
    else {
      console.log('User has active group, setting it as active');
      this.activeGroup = activeUser.groups.active;
    }
    console.log('service activeGroup: ', this.activeGroup);
  }
  
  async createAndSetGroup(activeUser: iUser) {
    const newGroup: iGroup = {
      id: '', // This will be replaced by the actual ID
      displayName: 'My first group',
      admins: [activeUser.uid],
      users: [activeUser.uid]
    };
    const groupId = await this.createGroup(newGroup); // Get the new group ID
    await this.setUserAsGroupMember(activeUser, groupId);
    console.log('Group created, User is now in a group');
  }
  
  async initializeUserGroups(activeUser: iUser) {
    await this._firestoreService.updateUser(activeUser.uid, {
      groups: { active: '', admin: [], member: [] }
    });
    console.log('User groups initialized to empty.');
  }

  async setActiveGroup(activeUser: iUser, groupId: string) {
    const currentUser = activeUser;
    const userGroups = currentUser.groups || {};
    await this._firestoreService.updateUser(currentUser.uid, {
      groups: { ...userGroups, active: groupId }
    });
    this.activeGroup = groupId;
    console.log('User active group set to: ', groupId);
  }

  async setUserAsGroupMember(activeUser: iUser, groupId: string) {
    const currentUser = activeUser;
    const userGroups = currentUser.groups || {};
    await this._firestoreService.updateUser(currentUser.uid, {
      groups: { ...userGroups, member: [...userGroups.member || [], groupId] }
    });
    console.log('User member group set: ', groupId);
    this.setActiveGroup(activeUser, groupId);
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

  async getGroupMembers(groupId: string): Promise<iUser[]> {
    const group = await this._firestoreService.getGroup(groupId);
    const members: iUser[] = [];
    for (const member of group.users) {
      const user = await this._firestoreService.getUser(member);
      members.push(user);
    }
    return members;
  }

}
