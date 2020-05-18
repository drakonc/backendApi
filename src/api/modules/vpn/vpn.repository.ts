import { Repository, EntityRepository } from "typeorm";
import { Vpn } from "./vpn.entity";

@EntityRepository(Vpn)
export class VpnRepository extends Repository<Vpn> {

}
