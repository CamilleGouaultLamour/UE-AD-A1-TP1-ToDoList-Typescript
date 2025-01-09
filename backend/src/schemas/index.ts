export const listListsSchema = {
    tags: ['lists'],
    summary: 'List all the lists',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: {
                $ref: 'ITodoList#'
            }
        }
    }
};

export const addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'ITodoList#'
    },
    response: {
        201: {
            description: 'List created successfully',
            type: 'object',
            properties: {
                message: { type: 'string' },
                list: { $ref: 'ITodoList#' }
            }
        },
        409: {
            description: 'Conflict: List already exists',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const updateListSchema = {
    tags: ['lists'],
    summary: 'Update an existing list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        $ref: 'ITodoList#'
    },
    response: {
        200: {
            description: 'Successful response',
            $ref: 'ITodoList#'
        },
        404: {
            description: 'List not found',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const addItemToListSchema = {
    tags: ['lists'],
    summary: 'Add a new item to a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            description: { type: 'string' },
            status: { $ref: 'ListStatus#' }
        },
        required: ['id', 'description', 'status']
    },
    response: {
        201: {
            description: 'Item added successfully',
            $ref: 'ITodoList#'
        },
        404: {
            description: 'List not found',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        409: {
            description: 'Conflict: Item already exists',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const removeItemFromListSchema = {
    tags: ['lists'],
    summary: 'Remove an item from a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            itemId: { type: 'string' }
        },
        required: ['id', 'itemId']
    },
    response: {
        200: {
            description: 'Item removed successfully',
            $ref: 'ITodoList#'
        },
        404: {
            description: 'List or item not found',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const updateItemInListSchema = {
    tags: ['lists'],
    summary: 'Update an item in a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            itemId: { type: 'string' }
        },
        required: ['id', 'itemId']
    },
    body: {
        type: 'object',
        properties: {
            description: { type: 'string' },
            status: { $ref: 'ListStatus#' }
        },
        required: []
    },
    response: {
        200: {
            description: 'Item updated successfully',
            $ref: 'ITodoList#'
        },
        404: {
            description: 'List or item not found',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};
