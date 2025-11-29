class LoginPage {
  get username() { return $('#user-name'); }
  get password() { return $('#password'); }
  get loginBtn() { return $('#login-button'); }

  async login(u, p) {
    await this.username.setValue(u);
    await this.password.setValue(p);
    await this.loginBtn.click();
  }
}
export default new LoginPage();
