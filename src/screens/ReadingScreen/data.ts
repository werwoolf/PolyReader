export type Translation = {
  from: string,
  to: string
}

export const selectableTextComponentProps = {
  onLongPress: () => {}
};

export enum SelectionMenuItemsEnum {
  Translate = "Translate"
}

export const selectionMenuItems: SelectionMenuItemsEnum[] = [SelectionMenuItemsEnum.Translate];
