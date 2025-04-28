export type List = {
  user_id: string,
  title: string,
}

export type ListItem = {
    id?: number,
    list_id: number;
    content: string;
    is_checkbox: boolean;
    is_checked: boolean | null;
  }