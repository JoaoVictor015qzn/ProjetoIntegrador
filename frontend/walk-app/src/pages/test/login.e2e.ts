describe("Tela de Login - E2E", () => {
  const url = "http://localhost:5173/"; // Ajusta se a porta for outra

  beforeEach(async () => {
    await browser.url(url);
  });

  it("mostra alerta quando email ou senha estão vazios", async () => {
    const btnEntrar = await $('button=Entrar');

    await btnEntrar.click();

    const alertText = await browser.getAlertText();
    expect(alertText).toBe("Preencha e-mail e senha!");

    await browser.acceptAlert();
  });

  it("altera o tipo de usuário para Pessoa Jurídica", async () => {
    const select = await $("select");

    await select.selectByVisibleText("Pessoa Jurídica");

    const value = await select.getValue();
    expect(value).toBe("Pessoa Jurídica");
  });

  it("mostra e esconde a senha ao clicar no botão do olho", async () => {
    const inputSenha = await $('input[placeholder="Senha"]');
    const eyeBtn = await $(".eye-btn");

    let type = await inputSenha.getAttribute("type");
    expect(type).toBe("password");

    await eyeBtn.click();
    type = await inputSenha.getAttribute("type");

    expect(type).toBe("text");
  });

  it("realiza login PF e navega para /home", async () => {
    await $('input[placeholder="E-mail"]').setValue("user@test.com");
    await $('input[placeholder="Senha"]').setValue("123456");

    await $('button=Entrar').click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/home"),
      { timeout: 3000 }
    );

    expect(await browser.getUrl()).toContain("/home");
  });

  it("realiza login PJ e navega para /admin", async () => {
    const select = await $("select");

    await select.selectByVisibleText("Pessoa Jurídica");

    await $('input[placeholder="E-mail"]').setValue("admin@test.com");
    await $('input[placeholder="Senha"]').setValue("admin123");

    await $('button=Entrar').click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/admin"),
      { timeout: 3000 }
    );

    expect(await browser.getUrl()).toContain("/admin");
  });
});
