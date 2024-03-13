import { Injectable } from '@angular/core';
import { 
  Firestore, QueryConstraint, 
  collection, collectionData, 
  query, where, doc, addDoc, setDoc, updateDoc, deleteDoc 
} from '@angular/fire/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';
import { iGroup, iTodo, iUser } from '../@interfaces/interfaces';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private readonly _firestore: Firestore,
  ) {}
  
  //-----------------------------------TODOS-----------------------------------

  /**
   * Method to load all the todos from the database with the group ID
   * @param id Group ID
   */
  loadTodos(groupId: string): Observable<iTodo[]> {
    // Référence to the collection
    const todosCollection = collection(this._firestore, `todos`);
    // Query to get the todos
    const byGroup: QueryConstraint = where('groupId', '==', groupId);
    // Build the query with contraints
    const q = query(todosCollection, byGroup);
    // Get the datas as observable with custom ID field
    const data$ = collectionData(q, {idField: 'id'});
    return data$ as Observable<iTodo[]>;
  };

  /**
   * Method to add a new todo to the database
   * @param newTodo Todo object to add
   */
  async addTodoItem(newTodo: Omit<iTodo, "id">): Promise<void> {
    const todosCollection = collection(this._firestore, `todos`);
    await addDoc(todosCollection, newTodo);
  }

  /**
   * Method to update a todo in the database
   * @param updatedTodo Todo object to update
   */
  async updateTodoItem(updatedTodo: iTodo): Promise<void> {
    const todoReference = doc(this._firestore, `todos/` + updatedTodo.id);
    await updateDoc(todoReference, {completed: updatedTodo.completed});
    // TODO: STOCKER LAST UPDATE USER, DATE, ETC
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
    return newGroup.id;
  }

  // TODO: Create method to update group
  /**
   * Method to update a group in the database
   * @param updatedGroup 
   */
  // async updateGroup(groupId: string, updatedGroup: iGroup){
  //   const groupReference = doc(this._firestore, `groups/` + groupId);
  //   await updateDoc(groupReference, updatedGroup);
  // }

}
