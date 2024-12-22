import { Iuser } from "./iuser.interface";

export interface Ipages {
    items: Iuser[];
    "page": number,
    "per_page": number,
    "total": number,
    "total_pages": number,
    "results": Iuser[];
    users: Iuser[];
}