export type BaseEntity = {
  id?: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Task = Entity<{
  title: string;
  completed: boolean;
}>;
