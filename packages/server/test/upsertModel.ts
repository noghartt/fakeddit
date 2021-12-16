import { Model, Document } from 'mongoose';

// TODO: I think that the types here can be improved
export const upsertModel = async <T extends Document, K extends Function>(
  model: Model<T>,
  createFn: K
): Promise<T> => {
  const data = await model.findOne();

  if (data) return data;

  return createFn();
}
