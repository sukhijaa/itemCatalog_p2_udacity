export const UIPropertiesActionTypes = {
  CHANGE_SORTING_ORDER: 'changeSort',
  CHANGE_GROUPING_ORDER: 'changeGroup',
  EXPAND_CATEGORY: 'expandGroup',
  COLLAPSE_GROUP: 'collapseGroup'
};

export const changeSortingOrder = (newSortOrder) => {
  return {type: UIPropertiesActionTypes.CHANGE_SORTING_ORDER, payload: newSortOrder};
};

export const changeGroupingOrder = (newGroup) => {
  return {type: UIPropertiesActionTypes.CHANGE_GROUPING_ORDER, payload: newGroup};
};

export const expandGroup = (catId) => {
  return {type: UIPropertiesActionTypes.EXPAND_CATEGORY, payload: catId}
};

export const collapseGroup = (catId) => {
  return {type: UIPropertiesActionTypes.COLLAPSE_GROUP, payload: catId}
};