import mongoose from 'mongoose';

// TODO: Instead of pass this `forEach`, could I simple reassign the property
// with an empty object?
const deleteProperties = <T>(obj: T): void => {
  const objNames = Object.keys(obj);
  objNames.forEach(itemName => {
    delete obj[itemName];
  });
};

export const disconnectWithMongoose = async (): Promise<void> => {
  await mongoose.disconnect();

  mongoose.connections.forEach(connection => {
    deleteProperties(connection.models);
    deleteProperties(connection.collections);
    deleteProperties(connection.models);
  });
};
