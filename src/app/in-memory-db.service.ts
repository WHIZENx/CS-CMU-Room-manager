import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Users } from "./users";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: Users[] = [
      {
        username: "cscmu",
        password: "cs204361",
        permission: "staff"
      },
      {
        username: "cs361",
        password: "aab123",
        permission: "user"
      }
    ];
    return { users };
  }
}
