import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from './user-card/user-card.component';
import { Ipages } from '../../interfaces/ipages.interface';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './listView.component.html',
  styleUrl: './listView.component.css'
})
export class ListViewComponent {
  uServices = inject(UsersService);
  usersArray: Iuser[] = [];
  items: any[] = [];
  usersPerPage: number = 8; // CHANGING THIS VALUE WILL CHANGE THE NUMBER OF USERS VISUALIZED PER PAGE
  actualPage: number = 1;
  DB_total_users = 1;
  listView_total_pages = 1;

  async ngOnInit() {
    const pageData: Ipages = await this.uServices.getPage(this.actualPage);
    if (Array.isArray(pageData.items)) {
      this.items = this.shuffleArray(pageData.items as unknown as any[]);
    } else {
      console.error('pageData.items is not an array');
    }

    try {
      this.DB_total_users = await this.uServices.getDBtotalUsers();
    } catch (error) {
      console.log(error);
    }
    this.listView_total_pages = this.DB_total_users % this.usersPerPage === 0 ? (this.DB_total_users / this.usersPerPage) : Math.trunc(this.DB_total_users / this.usersPerPage) + 1;
    console.log("Numero maxim de pagines:", this.listView_total_pages);
    this.loadPage();
  }

  async loadPage() {
    try {
      this.usersArray = this.shuffleArray(this.usersArray = this.shuffleArray((await this.uServices.getPage(this.actualPage)).results));
    }
    catch (error) { console.log(error); }
  }

  shuffleArray(array: any[]): any[] {
    return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  nextPage() {
    if (this.actualPage < this.listView_total_pages) {
      this.actualPage++;
      this.loadPage();
    }
  }

  previousPage() {
    if (this.actualPage > 1) {
      this.actualPage--;
      this.loadPage();
    }
  }
}