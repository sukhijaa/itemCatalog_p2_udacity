import {CategoryActionTypes} from 'actions/Categories.action.js';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case CategoryActionTypes.ADD_ALL_CATEGORIES: {
            const allCategories = {...state};
            (action.payload || []).forEach(category => {
               allCategories[category.id] = category;
            });
            return allCategories;
        }
        case CategoryActionTypes.ADD_CATEGORY: {
            const allCategories = {...state};
            const catToAdd = action.payload || null;
            if (catToAdd) {
                allCategories[catToAdd.id] = catToAdd;
                return allCategories;
            } else {
                return state;
            }
        }
        case CategoryActionTypes.ADD_ITEM_TO_CATEGORY: {
            const {categoryId, itemToAdd} = action.payload;

            const allCategories = {...state};
            const selectedCat = allCategories[categoryId];
            selectedCat.catalogItems = selectedCat.catalogItems || {}
            selectedCat.catalogItems[itemToAdd.id] = itemToAdd;
            allCategories[categoryId] = {...selectedCat};
            return allCategories;
        }
        case CategoryActionTypes.EDIT_CATEGORY: {
            const {categoryId, newCategoryData} = action.payload;
            const allCategories = {...state};
            const selectedCat = allCategories[categoryId];
            allCategories[categoryId] = {...selectedCat, ...newCategoryData};
            return allCategories;
        }
        case CategoryActionTypes.EDIT_ITEM_IN_CATEGORY: {
            const {categoryId, itemId, newItemData} = action.payload;
            const allCategories = {...state};
            const selectedCat = allCategories[categoryId];
            const selectedItem = selectedCat.catalogItems[itemId];
            selectedCat.catalogItems[itemId] = {...selectedItem, ...newItemData};
            allCategories[categoryId] = selectedCat;
            return allCategories;
        }
        case CategoryActionTypes.REMOVE_CATEGORY: {
            const allCategories = {...state};
            delete allCategories[action.payload];
            return allCategories;
        }
        case CategoryActionTypes.REMOVE_ITEM_FROM_CATEGORY: {
            const {categoryId, itemId} = action.payload;
            let selectedCat = {...state[categoryId]};
            const catalogItems = {...selectedCat.catalogItems};
            delete catalogItems[itemId];
            selectedCat = {...selectedCat, catalogItems};
            const allCategories = {...state, [categoryId]: selectedCat};
            return allCategories;
        }
        default:
            return state;
    }
};