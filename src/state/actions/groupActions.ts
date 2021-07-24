export enum GroupActionType {
  selectGroup = 'groups/selectGroup',
  updateGroup = 'groups/update',
}

export const selectGroup = (payload: number) => ({
  type: GroupActionType.selectGroup,
  payload,
})
