import { Injectable } from '@angular/core';
import { 
  Firestore, QueryConstraint, 
  collection, collectionData, 
  query, where, doc, addDoc, updateDoc, deleteDoc 
} from '@angular/fire/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';
import { iTodo, iUser } from '../@interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private readonly _firestore: Firestore
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
    // const newTodoWithId = {...newTodo, id: Math.random().toString(36).substring(2)};
    // const todosCollection = collection(this._firestore, `todos`);
    // await addDoc(todosCollection, newTodoWithId);

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
    // STOCKER LAST UPDATE USER, DATE, ETC
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
   * 
   * @param uid 
   * @returns 
   */
  async loadUser(uid: string) {
    // Référence to the collection
    const usersCollection = collection(this._firestore, `users`);
    // Query to get the todos
    const byUid: QueryConstraint = where('uid', '==', uid);
    // Build the query with contraints
    const q = query(usersCollection, byUid);
    // Get the datas as observable with custom ID field
    const data$ = collectionData(q, {idField: 'id'});
    return await firstValueFrom((data$ as Observable<iUser[]>)
      .pipe(map(users => users[0])));
  };

  /**
   * 
   * @param newUser 
   */
  async addUser(newUser: iUser){
    const usersCollection = collection(this._firestore, `users`);
    await addDoc(usersCollection, newUser);
  }

}
