import { FastifyReply, FastifyRequest } from "fastify"
import { ITodoList, TodoStatus } from "../interfaces";

export const listLists = async function (
    request: FastifyRequest, 
    reply: FastifyReply
) {
    console.log('DB status', this.level.listsdb.status)
    const listsIter = this.level.listsdb.iterator()

    const result: ITodoList[] = []
    for await (const [key, value] of listsIter) {
        result.push(JSON.parse(value))
    }
    reply.send(result)
}

export async function addList(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const list = request.body as ITodoList
    try {
        const existingList = await this.level.listsdb.get(list.id.toString()).catch(() => null);

        if (existingList) {
            reply.status(409).send({ message: `A list with id ${list.id} already exists` });
            return;
        }

        await this.level.listsdb.put(list.id.toString(), JSON.stringify(list));

        reply.status(201).send({ message: 'List added successfully', list });
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred while adding the list', error });
    }
}

export async function updateList(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const { id } = request.params as { id: string };
    const updatedList = request.body as Partial<ITodoList>;

    const existingValue = await this.level.listsdb.get(id).catch(() => null);

    if (!existingValue) {
        reply.status(404).send({ message: `List with id ${id} not found` });
        return;
    }

    const existingList = JSON.parse(existingValue) as ITodoList;
    const mergedList = { ...existingList, ...updatedList };

    await this.level.listsdb.put(id, JSON.stringify(mergedList));

    reply.send(mergedList);
}

export async function addItemToList(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const { id } = request.params as { id: string };
    const newItem = request.body as { id: string; description: string; status: TodoStatus };

    try {
        const existingValue = await this.level.listsdb.get(id).catch(() => null);

        if (!existingValue) {
            reply.status(404).send({ message: `List with id ${id} not found` });
            return;
        }

        const existingList = JSON.parse(existingValue) as ITodoList;

        if (existingList.items && existingList.items.some(item => item.id === newItem.id)) {
            reply.status(409).send({ message: `An item with id ${newItem.id} already exists in list ${id}` });
            return;
        }

        const updatedItems = existingList.items ? [...existingList.items, newItem] : [newItem];
        const updatedList = { ...existingList, items: updatedItems };

        await this.level.listsdb.put(id, JSON.stringify(updatedList));

        reply.status(201).send(updatedList);
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred while adding the item', error });
    }
}


export async function removeItemFromList(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const { id, itemId } = request.params as { id: string; itemId: string };

    const existingValue = await this.level.listsdb.get(id).catch(() => null);

    if (!existingValue) {
        reply.status(404).send({ message: `List with id ${id} not found` });
        return;
    }

    const existingList = JSON.parse(existingValue) as ITodoList;

    if (!existingList.items || !existingList.items.some(item => item.id === itemId)) {
        reply.status(404).send({ message: `Item with id ${itemId} not found in list ${id}` });
        return;
    }

    const updatedItems = existingList.items.filter(item => item.id !== itemId);
    const updatedList = { ...existingList, items: updatedItems };

    await this.level.listsdb.put(id, JSON.stringify(updatedList));

    reply.send(updatedList);
}

export async function updateItemInList(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const { id, itemId } = request.params as { id: string; itemId: string };
    const updatedItem = request.body as { description?: string; status?: TodoStatus }; 

    const existingValue = await this.level.listsdb.get(id).catch(() => null);

    if (!existingValue) {
        reply.status(404).send({ message: `List with id ${id} not found` });
        return;
    }

    const existingList = JSON.parse(existingValue) as ITodoList;

    if (!existingList.items || !existingList.items.some(item => item.id === itemId)) {
        reply.status(404).send({ message: `Item with id ${itemId} not found in list ${id}` });
        return;
    }

    const updatedItems = existingList.items.map(item => {
        if (item.id === itemId) {
            return { ...item, ...updatedItem };
        }
        return item;
    });

    const updatedList = { ...existingList, items: updatedItems };

    await this.level.listsdb.put(id, JSON.stringify(updatedList));

    reply.send(updatedList);
}


