import { Prisma } from '@prisma/client';

export const datamodelMapper = () => {
  const datamodel = Prisma.dmmf.datamodel;

  const models = datamodel.models.reduce(
    (acc, model) => ((acc[model.name] = model), acc),
    {} as Record<string, Prisma.DMMF.Model>,
  );

  const enumMap = datamodel.enums.reduce(
    (acc, enumItem) => ((acc[enumItem.name] = enumItem), acc),
    {} as Record<string, Prisma.DMMF.DatamodelEnum>,
  );

  return { models, enumMap };
};
