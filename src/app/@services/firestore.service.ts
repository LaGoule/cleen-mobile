import { Injectable } from '@angular/core';
import { 
  Firestore, QueryConstraint, 
  collection, collectionData, 
  query, where, doc, addDoc, setDoc, updateDoc, deleteDoc, orderBy
} from '@angular/fire/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';
import { iGroup, iTodo, iUser } from '../@interfaces/interfaces';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  protected constraints: QueryConstraint[] = [
    where('completed', '==', false),
    where('completed', '==', true),
  ]

  constructor(
    private readonly _firestore: Firestore,
  ) {}
  
  //-----------------------------------TODOS-----------------------------------

  /**
   * Method to load all the todos from the database with the group ID
   * @param id Group ID
   */
  loadTodos(groupId: string, constraintIndex: number): Observable<iTodo[]> {
    // Référence to the collection
    const todosCollection = collection(this._firestore, `todos`);
    // Query to get the todos
    const byGroup: QueryConstraint = where('groupId', '==', groupId);
    // Build the query with contraints
    const q = query(todosCollection, byGroup, this.constraints[constraintIndex]);
    // Get the datas as observable with custom ID field
    const data$ = collectionData(q, {idField: 'id'}); 
    return data$ as Observable<iTodo[]>;
  };

  /**
   * Method to add a new todo to the database
   * @param newTodo Todo object to add
   */
  async addTodoItem(newTodo: iTodo): Promise<string> {
    const todosCollection = collection(this._firestore, `todos`);
    const docRef = await addDoc(todosCollection, newTodo);
    newTodo.id = docRef.id;
    await updateDoc(docRef, { ...newTodo } as { [x: string]: any; });
    return newTodo.id;
  }

  /**
   * Method to update a todo in the database
   * @param updatedTodo Todo object to update
   */
  async updateTodoItem(updatedTodo: iTodo): Promise<void> {
    const docRef = doc(this._firestore, `todos/` + updatedTodo.id);
    await updateDoc(docRef, { ...updatedTodo } as { [x: string]: any; });
  }

  /**
   * Method to toggle a todo in the database
   * @param todo Todo object to toggle
   */
  async toggleTodoItem(todo: iTodo): Promise<void> {
    const updatedTodo = {...todo, completed: !todo.completed};
    await this.updateTodoItem(updatedTodo);
  }

  /**
   * Method to remove a todo from the database
   * @param id Todo ID to remove
   */
  async removeTodoItem(id: string): Promise<void> {
    const todoReference = doc(this._firestore, `todos/` + id);
    await deleteDoc(todoReference);
  }

  //-----------------------------------USERS-----------------------------------

  /**
   * Method to get a user from the database with the UID
   * @param uid 
   * @returns 
   */
  async getUser(uid: string) {
    // Référence to the collection
    const usersCollection = collection(this._firestore, `users`);
    // Query to get the todos
    const byUid: QueryConstraint = where('uid', '==', uid);
    // Build the query with contraints
    const q = query(usersCollection, byUid);
    // Get the datas as observable with custom ID field
    const data$ = collectionData(q);
    const result = await firstValueFrom((data$ as Observable<iUser[]>).pipe(map(users => users[0])));
    return result;
  };

  /**
   * Method to add a new user to the database
   * @param newUser 
   */
  async addUser(newUser: iUser, customId: string){
    const usersCollection = doc(this._firestore, `users`, customId);
    await setDoc(usersCollection, newUser);
  }

  /**
   * Method to update a user in the database
   * @param uid User ID to update
   * @param updatedUser User object to update
   */
  async updateUser(uid: string, updatedUser: Partial<iUser>): Promise<void> {
    const userReference = doc(this._firestore, `users/` + uid);
    await updateDoc(userReference, updatedUser);
  }

  //-----------------------------------GROUPS-----------------------------------

  /**
   * Method to add a new group to the database
   * @param newGroup 
   */
  async addGroup(newGroup: iGroup){
    const groupsCollection = collection(this._firestore, `groups`);
    const docRef = await addDoc(groupsCollection, newGroup);
    newGroup.id = docRef.id;
    await updateDoc(docRef, { ...newGroup } as { [x: string]: any; });
    console.log('Group created: ', newGroup.id);
    return newGroup.id;
  }

  /**
   * Method to update a group in the database
   * @param updatedGroup 
   */
  async updateGroup(groupId: string, updatedGroup: iGroup){
    const groupReference = doc(this._firestore, `groups/` + groupId);
    await updateDoc(groupReference, { ...updatedGroup } as { [x: string]: any; });
  }

  /**
   * Method to get a group from the database with the ID
   * @param groupId 
   * @returns 
   */
  async getGroup(groupId: string) {
    // Référence to the collection
    const groupsCollection = collection(this._firestore, `groups`);
    // Query to get the todos
    const byId: QueryConstraint = where('id', '==', groupId);
    // Build the query with contraints
    const q = query(groupsCollection, byId);
    // Get the datas as observable with custom ID field
    const data$ = collectionData(q);
    const result = await firstValueFrom((data$ as Observable<iGroup[]>).pipe(map(groups => groups[0])));
    return result;
  }

  /**
   * Method to get all the members of a group from the database
   * @returns 
   */
  async getUsers(groupId: string) {
    // Référence to the collection
    const usersCollection = collection(this._firestore, `users`);
    // Query to get the todos
    const byGroup: QueryConstraint = where('groups.member', 'array-contains', groupId);    
    // Build the query with contraints
    const q = query(usersCollection, byGroup);
    // Get the datas as observable with custom ID field
    const data$ = collectionData(q);
    return firstValueFrom((data$ as Observable<iUser[]>));
  }

}
