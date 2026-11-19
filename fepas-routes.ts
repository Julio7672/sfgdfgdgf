import { FastifyInstance } from 'fastify'
import { requireAdmin } from '@/core/http/require-admin'
import { requirePermission } from '@/core/http/require-permission'
import { ListFepasAccreditationsController } from './controller/list-fepas-accreditations'
import { CountFepasAccreditationsController } from './controller/count-fepas-accreditations'
import { ListFepasAccreditationsByDocumentController } from './controller/list-fepas-accreditations-by-document'
import { CreateFepasAccreditationController } from './controller/create-fepas-accreditation'
import { ToggleFepasAccreditationStatusController } from './controller/toggle-fepas-accreditation-status'
import { ToggleFepasPixAssociationController } from './controller/toggle-fepas-pix-association'
import { ListFepasDestinationNetworksController } from './controller/list-fepas-destination-networks'
import { ListFepasDestinationNetworkAccreditationsController } from './controller/list-fepas-destination-network-accreditations'
import { ListAvailableFepasDestinationNetworkAccreditationsController } from './controller/list-available-fepas-destination-network-accreditations'
import { CreateFepasDestinationNetworkAssociationController } from './controller/create-fepas-destination-network-association'
import { DeleteFepasDestinationNetworkAssociationController } from './controller/delete-fepas-destination-network-association'
import { ListFepasProductsController } from './controller/list-fepas-products'
import { GetFepasProductByIdController } from './controller/get-fepas-product-by-id'
import { CreateFepasProductController } from './controller/create-fepas-product'
import { UpdateFepasProductController } from './controller/update-fepas-product'
import { DeleteFepasProductController } from './controller/delete-fepas-product'
import { ListFepasProductAccreditationsController } from './controller/list-fepas-product-accreditations'
import { ListAvailableFepasProductAccreditationsController } from './controller/list-available-fepas-product-accreditations'
import { CreateFepasProductAssociationController } from './controller/create-fepas-product-association'
import { UpdateFepasProductAssociationController } from './controller/update-fepas-product-association'
import { DeleteFepasProductAssociationController } from './controller/delete-fepas-product-association'

export function fepasRoutes(app: FastifyInstance) {
  app.addHook('onRoute', routeOptions => {
    routeOptions.schema = {
      ...routeOptions.schema,
      tags: ['FEPAS'],
    }
  })

  app.addHook('preHandler', requireAdmin)

  const view = { preHandler: requirePermission('fepas', 'view') }
  const edit = { preHandler: requirePermission('fepas', 'edit') }

  app.get('/accreditations', view, new ListFepasAccreditationsController().handle)
  app.get('/accreditations/count', view, new CountFepasAccreditationsController().handle)
  app.get('/accreditations/by-document', view, new ListFepasAccreditationsByDocumentController().handle)
  app.post('/accreditations', edit, new CreateFepasAccreditationController().handle)
  app.patch('/accreditations/:idAccreditation/status', edit, new ToggleFepasAccreditationStatusController().handle)
  app.patch('/accreditations/:idAccreditation/pix', edit, new ToggleFepasPixAssociationController().handle)
  app.get('/destination-networks', view, new ListFepasDestinationNetworksController().handle)
  app.get('/destination-networks/:idDestinationNetwork/accreditations', view, new ListFepasDestinationNetworkAccreditationsController().handle)
  app.get('/destination-networks/:idDestinationNetwork/available-accreditations', view, new ListAvailableFepasDestinationNetworkAccreditationsController().handle)
  app.post('/destination-networks/associations', edit, new CreateFepasDestinationNetworkAssociationController().handle)
  app.delete('/destination-networks/associations', edit, new DeleteFepasDestinationNetworkAssociationController().handle)
  app.get('/products', view, new ListFepasProductsController().handle)
  app.get('/products/:id', view, new GetFepasProductByIdController().handle)
  app.post('/products', edit, new CreateFepasProductController().handle)
  app.put('/products/:id', edit, new UpdateFepasProductController().handle)
  app.delete('/products/:id', edit, new DeleteFepasProductController().handle)
  app.get('/products/:id/accreditations', view, new ListFepasProductAccreditationsController().handle)
  app.get('/products/:id/available-accreditations', view, new ListAvailableFepasProductAccreditationsController().handle)
  app.post('/products/associations', edit, new CreateFepasProductAssociationController().handle)
  app.put('/products/associations', edit, new UpdateFepasProductAssociationController().handle)
  app.delete('/products/associations', edit, new DeleteFepasProductAssociationController().handle)
}
