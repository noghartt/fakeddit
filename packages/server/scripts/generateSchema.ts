import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { printSchema } from 'graphql/utilities';

import { schema } from '../src/schema';

const pwd = process.cwd();

const generateSchema = async () => {
  const configs = [{ schema, path: path.join(pwd, './graphql/schema.gql') }];

  for (const config of configs) {
    const dirPath = config.path.split('/schema.gql')[0];

    if (!fsSync.existsSync(dirPath)) {
      await fs.mkdir(dirPath);
    }

    await fs.writeFile(config.path, printSchema(config.schema));
  }
};

generateSchema();
