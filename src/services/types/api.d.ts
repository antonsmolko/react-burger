export type TApiSaveToken = (accessToken: string, refreshToken: string) => void

export type TApiResetToken = () => void

export type TApiRequest = () => Promise

export type TApiWithRefreshToken = (requestCallback: () => Promise<Response | void>) => Promise

export type TApiOrderRequest = (ingredients: Array<number>) => Promise

export type TApiForgotPasswordRequest = (email: string) => Promise

type TApiResetPasswordRequestPayload = {
  password: string;
  token: string;
}
export type TApiResetPasswordRequest = (payload: TApiResetPasswordRequestPayload) => Promise

type TApiLoginRequestPayload = {
  email: string;
  password: string;
}

export type TApiLoginRequest = (payload: TApiLoginRequestPayload) => Promise

type TApiRegisterRequestPayload = TApiLoginRequestPayload & {
  name: string;
}

export type TApiRegisterRequest = (payload: TApiRegisterRequestPayload) => Promise<TApiRegisterRequestResponse>

type TApiUpdateUserRequestPayload = {
  [p: string]: string;
}

export type TApiUpdateUserRequest = (payload: TApiUpdateUserRequestPayload) => Promise

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
