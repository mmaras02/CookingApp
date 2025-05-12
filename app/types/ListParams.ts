export type List = {
  id: number,
  user_id: string,
  title: string,
  created_at: EpochTimeStamp,
}

export type ListItem = {
    id?: number,
    list_id: number;
    content: string;
    is_checkbox: boolean;
    is_checked: boolean | null;
  }