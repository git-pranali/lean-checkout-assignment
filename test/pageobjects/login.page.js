/**
 * Login Page Object
 * Contains all elements and methods related to the login page
 */
class LoginPage {

  get username() {
    return $('#user-name');
  }

  get password() {
    return $('#password');
  }

  get loginBtn() {
    return $('#login-button');
  }

  /**
   * Performs login action with provided credentials
   * @param {string} user - Username to login 
   * @param {string} pass - Password to login 
   */
  async login(user, pass) {
    await this.username.setValue(user);
    await this.password.setValue(pass);
    await this.loginBtn.click();
  }
}

export default new LoginPage();
