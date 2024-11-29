import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'

async function lists(fastify: FastifyInstance) {

    fastify.get('/', listsController.listLists)

    fastify.post('/', listsController.addList)

    fastify.put('/:id', listsController.updateList);

    fastify.post('/:id/items', listsController.addItemToList);

    fastify.delete('/:id/items/:itemId', listsController.removeItemFromList);

    fastify.put('/:id/items/:itemId', listsController.updateItemInList);

}

export default lists