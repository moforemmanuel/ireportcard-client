import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";

export function deleteUserToken() {

}

export interface Settings {
  schoolId: number
}
const LS_KEY = {
  sessionId: 'session_id',
  settings: 'rc_settings',
  rememberMe: 'remember_me'
};
export module LocalStorageUtil {
  export const writeUserToken = (token: string) => {
    localStorage.setItem(LS_KEY.sessionId, token)
  }

  export const readUserToken = (): string | null => {
    return localStorage.getItem(LS_KEY.sessionId);
  }

  export const deleteUserToken = (): void => {
    localStorage.removeItem(LS_KEY.sessionId);
  }

  export const writeSettings = (settings: Settings): void => {
    localStorage.setItem(LS_KEY.settings, JSON.stringify(settings));
  }

  export const readSettings = (): Settings | null => {
    const settings = localStorage.getItem(LS_KEY.settings);
    if (settings) {
      return JSON.parse(settings);
    } return null;
  }

  export const writeRememberMe = (value: boolean) => {
    localStorage.setItem(LS_KEY.rememberMe, String(value));
  }

  export const readRememberMe = (): boolean => {
    const rem = localStorage.getItem(LS_KEY.rememberMe);
    return rem? rem === 'true': false;
  }
}
