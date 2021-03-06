import { ReadRoleDto } from "../modules/role/dto/read-role.dto";

export interface IJwtPayload {
    id: number;
    username: string;
    email: string;
    role: ReadRoleDto;
    iat?: Date;
}