export type TGetCookie = (name: string) => unknown | undefined

type TSetCookieProps = {
  expires?: Date | number | string;
  [propName: string]: unknown
}
export type TSetCookie = (name: string, value: string | number | boolean | null, props?: TSetCookieProps) => void

export type TDeleteCookie = (name: string) => void

export type TGetQueryParams = (search: string) => ({
  [p: string]: string;
})

export type TLocalStorage = {
  get: (key: string, defaultValue?: unknown) => string | number | boolean | object;
  set: (key: string, value: string | number | boolean | object) => void;
  remove: (key: string) => void;
}
