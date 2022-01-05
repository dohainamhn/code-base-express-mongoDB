export interface Repository <T extends object> {
  create: (payload: T)=> Promise<T>,
  get: (filters : Partial<T>) => Promise<T>
}