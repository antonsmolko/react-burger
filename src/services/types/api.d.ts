import { TUser } from './contexts';

export type TApiSaveToken = (accessToken: string, refreshToken: string) => void

export type TApiResetToken = () => void

export type TApiRequest = () => Promise

export type TApiWithRefreshToken = (requestCallback: () => Promise<Response | void>) => Promise

export type TApiOrderRequest = (ingredients: Array<number>) => Promise

export type TUserRegisterRequest = {
  name: string;
  email: string;
  password: string;
}

export type TApiForgotPasswordRequest = (email: string) => Promise

type TApiResetPasswordRequestPayload = {
  password: string;
  token: string;
}
export type TApiResetPasswordRequest = (payload: TApiResetPasswordRequestPayload) => Promise

export type TApiLoginRequest = (payload: TUserRegisterRequest) => Promise

type TApiRegisterRequestPayload = {
  name: string;
  email: string;
  password: string;
}

export type TApiRegisterRequest = (payload: TApiRegisterRequestPayload) => Promise

type TApiUpdateUserRequestPayload = {
  [p: string]: string;
}

export type TApiUpdateUserRequest = (payload: TApiUpdateUserRequestPayload) => Promise<
  TResponseBody<'user' | 'success', TUser | boolean>
>

export type TApiCheckResponse = (res: Response) => Promise

type TOptions = {
  [p: string]: string | boolean | number | object;
}

type TApiOptions = TOptions & {
  headers?: TOptions;
}

export type TApiGenOptions = (options: TApiOptions) => TApiOptions

export type TApiPostOptions = {
  method: 'POST';
  body: string;
}

export type TApiGetPostOptions = (payload: TOptions) => TApiPostOptions

export type TApiGenPostOptions = (payload: TOptions, options: TApiOptions) => TApiOptions & TApiPostOptions

export type TApiRequestApi = (url: string, options?: TOptions) => Promise

type TApiMethod = 'get' | 'getWithAuth' | 'post' | 'postWithAuth'

export type TApi = {
  [method in TApiMethod]: TApiRequestApi;
}
