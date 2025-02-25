// https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
export type WorkflowItem = {
  uid?: string;
  title: string;
  subtitle?: string;
  arg: string | string[];
  icon?: {
    path: string;
    type: "fileicon" | "filetype";
  };
  valid?: boolean;
  match?: string;
  autocomplete?: string;
  type?: "default" | "file" | "file:skipcheck";
  mods?: {
    [id: string]: {
      valid: boolean;
      arg: string;
      subtitle: string;
    };
  };
  action?: object | string[] | string;
  text?: {
    copy?: string;
    largetype: string;
  };
  quicklookurl?: string;
};

export type WorkflowResponse = {
  items: WorkflowItem[];
  variables?: {
    [id: string]: string;
  };
};
