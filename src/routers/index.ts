import { getDirectories } from '../utils/getDirectories';
import express, { Router } from 'express';
import  YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const handleSetupNswagerRoute = (nswagerRouter: Router,path: string)=>{
  const swaggerDocument = YAML.load(`./src/modules/${path}/${path}.nswager.yaml`);
  nswagerRouter.use(`/${path}`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

const handleGenerateRouter = async (router: Router,nswagerRouter: Router) => {
  const directories = await getDirectories('src/modules')
  directories.forEach(async (dir) => {
    const { routes } = await import(`../modules/${dir}`);
    routes(`/${dir}`, router);
    handleSetupNswagerRoute(nswagerRouter,dir)
  })
  return {
    router,
    nswagerRouter
  }
}

export default async () => {
  const Router = express.Router();
  const nswagerRouter = express.Router();

  return await handleGenerateRouter(Router,nswagerRouter)
}

