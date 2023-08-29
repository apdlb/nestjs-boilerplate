// https://github.com/SoftwareBrothers/adminjs/blob/v7.2.1/src/current-admin.interface.ts
export type CurrentAdmin = {
  /**
   * Admin has one required field which is an email
   */
  email: string;
  /**
   * Optional title/role of an admin - this will be presented below the email
   */
  title?: string;
  /**
   * Optional url for an avatar photo
   */
  avatarUrl?: string;
  /**
   * Id of your admin user
   */
  id?: string;
  /**
   * Optional ID of theme to use
   */
  theme?: string;
  /**
   * Also you can put as many other fields to it as you like.
   */
  [key: string]: any;
};
