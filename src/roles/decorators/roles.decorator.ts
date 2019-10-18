import { SetMetadata } from "@nestjs/common";

export const AllowedRoles = (...roles: String[]) => SetMetadata('roles', roles);