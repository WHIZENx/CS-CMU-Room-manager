import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "./users";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable()
export class UserdbService {
  constructor(private http: HttpClient) {}

  private tweetUrl = "api/users/";

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.tweetUrl);
  }

  getUser(id: number): Observable<Users> {
    const url = `${this.tweetUrl}/${id}`;
    return this.http.get<Users>(url);
  }
}
