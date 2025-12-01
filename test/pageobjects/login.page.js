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

  async login(user, pass) {
    await this.username.setValue(user);
    await this.password.setValue(pass);
    await browser.pause(300); // Comment this line if you want to remove delay
    await this.loginBtn.click();
  }
}

export default new LoginPage();
