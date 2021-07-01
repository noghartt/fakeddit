import app from './app';
import config from './config';

const bootstrap = async () => {
  app.listen(config.PORT, () =>
    console.log(`server running on port: ${config.PORT}`),
  );
};

bootstrap();
