import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '@/common/types';

export const ROLE_KEY = 'role';

export const Role = (role: RoleEnum) => SetMetadata(ROLE_KEY, role);
