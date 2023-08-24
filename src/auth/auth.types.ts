import { RoleEnum } from '@/common/types';

type Common = {
  email: string;
  role: RoleEnum;
};

export type JwtPayload = Common & {
  sub: string;
};

export type JwtUser = Common & {
  id: string;
};
