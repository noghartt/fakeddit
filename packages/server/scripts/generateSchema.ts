import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { printSchema } from 'graphql/utilities';

import { schema } from '../src/schema/schema';

const pwd = process.cwd();

const schemaFile = 'schema.graphql';

const generateSchema = async () => {
  const configs = [{ schema, path: path.join(pwd, './graphql', schemaFile) }];

  for (const config of configs) {
    const dirPath = config.path.split(schemaFile)[0];

    // TODO: Should I put it on a try/catch?
    if (!fsSync.existsSync(dirPath)) {
      await fs.mkdir(dirPath);
    }

    await fs.writeFile(config.path, printSchema(config.schema));
  }
};

generateSchema();
