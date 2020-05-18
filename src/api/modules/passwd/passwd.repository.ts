import { Repository, EntityRepository } from "typeorm";
import { Passwd } from "./passwd.entity";

@EntityRepository(Passwd)
export class PasswdRepository extends Repository<Passwd> { }
