import { ListsApi } from 'todo-list-client';
import { v4 as uuidv4 } from 'uuid';
import { TodoListStatus } from "./api-types";

const api = new ListsApi();  

const listItems: Record<string, string[]> = {
    'Work Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Personal Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Shopping List': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter']
}

export const apiClient = {
    getLists: async () => {
        return api.listsGet().then(r => r.data); 
    },
    addList: async (listName: string) => {
        const newList = { 
        id: uuidv4(),
        description: listName, 
        status: 'PENDING' as TodoListStatus, 
        };  
        return api.listsPost(newList).then(r => r.data); 
    },
    deleteItemFromList: async (listId: string, itemId: string) => {
        try {
          const response = await api.listsIdItemsItemIdDelete(listId, itemId);
          console.log('Item supprimé', response.data); 
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'élément', error);
          throw error; 
        }
    },
    getTodos: async (listName: string): Promise<string[]> => {
        return Promise.resolve(listItems[listName])
    },
    addTodo: async (listName: string, todo: string) => {
        console.debug('-- addTodo', listName, todo, listItems);
        if (!listItems[listName]) {
            listItems[listName] = []
        }
        listItems[listName].push(todo)
        return Promise.resolve(listItems[listName])
    }
};
