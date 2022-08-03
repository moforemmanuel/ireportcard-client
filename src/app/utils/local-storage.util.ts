const LS_KEY = {
  sessionId: 'session_id',
  schoolId: 'school_id',
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

  export const writeSchoolId = (schoolId: number): void => {
    localStorage.setItem(LS_KEY.schoolId, String(schoolId));
  }

  export const readSchoolId = (): number | null => {
    const id = localStorage.getItem(LS_KEY.schoolId);
    return id? parseInt(id): null;
  }

  export const deleteSchoolId = (): void => {
    localStorage.removeItem(LS_KEY.schoolId);
  }

  export const writeRememberMe = (value: boolean) => {
    localStorage.setItem(LS_KEY.rememberMe, String(value));
  }

  export const readRememberMe = (): boolean => {
    const rem = localStorage.getItem(LS_KEY.rememberMe);
    return rem ? rem === 'true' : false;
  }
}
