import {APIEndpoints, HTTP} from "../utility/HTTPRequests";
import {} from 'store'

export const CategoryActionTypes = {
    ADD_ALL_CATEGORIES: 'addAllCats',
    ADD_CATEGORY: 'addCategory',
    REMOVE_CATEGORY: 'deleteCat',
    EDIT_CATEGORY: 'editCat',
    ADD_ITEM_TO_CATEGORY: 'addItemToCat',
    REMOVE_ITEM_FROM_CATEGORY: 'removeCatItem',
    EDIT_ITEM_IN_CATEGORY: 'editCatItem'
};

export const addAllCategories = (dispatch) => {
    const defaultArray = Array.apply(null, Array(10)).map((item, index) => ({id: index, name: 'Dummy Category ' + index, description: 'Dummy Desc', catalogItems: {[index + 100]: {name: 'Item ' + index, id: index + 100}}}));
    HTTP.GET(APIEndpoints.GET_ALL_CATEGORIES).then(res => {
        const allCategories = (res.data || []).map(category => {
            const allItems = category.catalogItems || [];
            category.catalogItems = {};
            allItems.forEach(item => category.catalogItems[item.id] = item);
            return category;
        });
        dispatch({type: CategoryActionTypes.ADD_ALL_CATEGORIES, payload: allCategories})
    }).catch(err => {
       dispatch({type: CategoryActionTypes.ADD_ALL_CATEGORIES, payload: defaultArray});
       console.error(err);
    });
};

export const addCategory = (newCategoryData) => {
    // TODO - Send a POST Request here to get the new id for newly added category
    return {type: CategoryActionTypes.ADD_CATEGORY, payload: newCategoryData};
};

export const removeCategory = (categoryId) => {
    return {type: CategoryActionTypes.REMOVE_CATEGORY, payload: categoryId};
};

export const editCategory = (categoryId, newCategoryData) => {
    // TODO - Send a POST
    return {type: CategoryActionTypes.EDIT_CATEGORY, payload: {categoryId, newCategoryData}};
};

export const addItemToCategory = (categoryId, itemToAdd) => {
    // TODO - Send a POST
    return {type: CategoryActionTypes.ADD_ITEM_TO_CATEGORY, payload: {categoryId, itemToAdd}}
};

export const removeItemFromCategory = (categoryId, itemId) => {
    // TODO - Send a DELETE
    return {type: CategoryActionTypes.REMOVE_ITEM_FROM_CATEGORY, payload: {categoryId, itemId}};
};

export const editItemInCategory = (categoryId, itemId, newItemData) => {
    // TODO - Send a POST
    return {type: CategoryActionTypes.EDIT_ITEM_IN_CATEGORY, payload: {categoryId, itemId, newItemData}};
};


