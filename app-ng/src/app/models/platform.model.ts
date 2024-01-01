import {File_handleModel} from "./file_handle.model";
import {Client} from "./client.model";

export interface Platform {
  id : number,
  nom : string,
  url : string,
  platformImages :any,
  creator:number
}
