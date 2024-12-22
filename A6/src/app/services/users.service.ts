import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Ipages } from '../interfaces/ipages.interface';
import { Iuser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = 'https://peticiones.online/api/users/';
  private userPerPageList: number = 8;
  private httpClient = inject(HttpClient);

  setUsersPerPage(n: number) {
    if (n > 1) {
      this.userPerPageList = n;
    }
  }

  getDBtotalUsers(): Promise<number> {
    return this.getDBPage(1).then((page: Ipages) => page.total);
  }

  async getPage(n: number): Promise<Iuser[]> {
    const firstPage = await this.getDBPage(1);
    const nUsersDBpage = firstPage.per_page;
    console.log('nUsersDBpage: ', nUsersDBpage);
    const nTotalPages = firstPage.total_pages;
    const nTotalUsers = firstPage.total;
    const nTotalVisualPages = nTotalUsers % this.userPerPageList === 0 ? nTotalUsers / this.userPerPageList : Math.trunc(nTotalUsers / this.userPerPageList) + 1;
    console.log('nTotalPages: ', nTotalPages);
    // total of users in the database
    const iniArrL = 1 + (n - 1) * this.userPerPageList;
    console.log('iniArrL: ', iniArrL);
    const user1L = (iniArrL % nUsersDBpage);
    console.log('user1L: ', user1L);
    const nPageDB = Math.trunc(iniArrL / nUsersDBpage) + 1;
    console.log('nPageDB: ', nPageDB);
    let nPageDB_Array = (await this.getDBPage(nPageDB)).results;
    console.log('nPageDB_Array: ', nPageDB_Array);
    const utilUsers = nPageDB_Array.length - user1L + 1;
    console.log('utilUsers: ', utilUsers);
    const firstIndex = user1L - 1;
    console.log('firstIndex: ', firstIndex);
    const lastIndex = firstIndex + this.userPerPageList;
    console.log('lastIndex: ', lastIndex);
    if (utilUsers >= this.userPerPageList) {
      console.log('Entering first IF ---- so we have enough users to return');
      const ret = nPageDB_Array.slice(firstIndex, lastIndex);
      //console.log('return: ', ret);
      return ret;
    } else if (n <= nTotalVisualPages) {
      console.log('Entering IF ELSE ----- so n<=nTotalVisualPages = true');
      const nextResults = (await this.getDBPage(nPageDB + 1)).results;
      console.log(nextResults);
      const ret = (nPageDB_Array.concat(nextResults)).slice(firstIndex, lastIndex);
      console.log('return: ', ret);
      return ret;
    } else {
      console.log('Entering to the end of DB ---- n<=nTotalVisualPages = false');
      console.log('n =', n);
      console.log('nTotalVisualPages =', nTotalVisualPages);
      const ret = nPageDB_Array.slice(firstIndex);
      console.log('return: ', ret);
      return ret;
    }
  }

  async getAllUsers(): Promise<Iuser[]> {
    let users: Iuser[] = [];
    const firstpage = await this.getDBPage(1); // así nos aseguramos de que funciona si el numero de paginas cambia.
    for (let i = 1; i <= firstpage.total_pages; i++) {
      const page = await this.getDBPage(i);
      users = users.concat(page.results);
    }
    return users;
  }

  /**
   * Inserts a user into the API.
   */
  async insert(bodyuser: Iuser): Promise<Iuser> {
    return firstValueFrom(this.httpClient.post<Iuser>(this.apiUrl, bodyuser));
  }

  /**
   * Updates a user in the API.
   */
  async update(bodyuser: Iuser): Promise<Iuser> {
    let id = bodyuser._id;
    delete bodyuser._id;
    return firstValueFrom(this.httpClient.put<Iuser>(this.apiUrl + id, bodyuser));
  }

  /**
   * Gets a user by its id.
   */
  getUserById(id: string): Promise<Iuser> {
    return firstValueFrom(this.httpClient.get<Iuser>(this.apiUrl + id));
  }

  /**
   * Deletes a user by its id.
   */
  deleteUserById(id: string): Promise<Iuser> {
    return firstValueFrom(this.httpClient.delete<Iuser>(this.apiUrl + id));
  }
}