export type MyData = {
  id: string;
  isOpen?: boolean;
  title: string;
  children?: MyData[];
  level: number;     //add hierarchy to database
  index?: number;
  content?: string
};

