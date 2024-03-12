import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public currentGroup: string = 'BNa7XXnCtJhLs8qSR1Oa';

  constructor() { }

  public isCurrentGroupSet(): boolean {
    return this.currentGroup !== '';
  }
  
  public setCurrentGroup(groupId: string): void {
    this.currentGroup = groupId;
  }

  public getCurrentGroup(): string {
    return this.currentGroup;
  }

  public resetCurrentGroup(): void {
    this.currentGroup = '';
  }

}
