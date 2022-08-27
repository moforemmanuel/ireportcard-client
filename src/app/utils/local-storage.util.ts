const LS_KEY = {
  sessionId: 'rc_session_id',
  school: 'rc_school',
  schoolId: 'rc_school_id',
  rememberMe: 'rc_remember_me',
};
export module LocalStorageUtil {
  export const writeUserToken = (token: string) => {
    localStorage.setItem(LS_KEY.sessionId, token)
  }

  export const readUserToken = (): string => {
    const token = localStorage.getItem(LS_KEY.sessionId);
    return token ? token : '';
  }

  export const deleteUserToken = (): void => {
    localStorage.removeItem(LS_KEY.sessionId);
  }

  export const writeSchoolId = (schoolId: number): void => {
    localStorage.setItem(LS_KEY.schoolId, String(schoolId));
  }

  export const readSchoolId = (): number | null => {
    const id = localStorage.getItem(LS_KEY.schoolId);
    return id ? parseInt(id) : null;
  }

  export const getSchoolId = (): number => {
    const id = readSchoolId();
    if (id) return id;
    else throw new Error('School id not found');
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
