export const UIPropertiesActionTypes = {
  CHANGE_SORTING_ORDER: 'changeSort',
  CHANGE_GROUPING_ORDER: 'changeGroup'
};

export const changeSortingOrder = (newSortOrder) => {
  return {type: UIPropertiesActionTypes.CHANGE_SORTING_ORDER, payload: newSortOrder};
};

export const changeGroupingOrder = (newGroup) => {
  return {type: UIPropertiesActionTypes.CHANGE_GROUPING_ORDER, payload: newGroup};
};