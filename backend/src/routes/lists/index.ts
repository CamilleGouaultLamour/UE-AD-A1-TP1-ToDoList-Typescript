import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'
import { addItemToListSchema, addListSchema, listListsSchema, removeItemFromListSchema, updateItemInListSchema, updateListSchema } from '../../schemas'

async function lists(fastify: FastifyInstance) {
    fastify.get('/', { schema: listListsSchema }, listsController.listLists);

    fastify.post('/', { schema: addListSchema }, listsController.addList);

    fastify.put('/:id', { schema: updateListSchema }, listsController.updateList);

    fastify.post('/:id/items', { schema: addItemToListSchema }, listsController.addItemToList);

    fastify.delete('/:id/items/:itemId', { schema: removeItemFromListSchema }, listsController.removeItemFromList);

    fastify.put('/:id/items/:itemId', { schema: updateItemInListSchema }, listsController.updateItemInList);
}

export default lists
