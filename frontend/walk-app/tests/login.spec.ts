import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173/";

test("alerta quando email ou senha estão vazios", async ({ page }) => {
  await page.goto(URL);

  await page.getByRole("button", { name: "Entrar" }).click();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Preencha e-mail e senha!");
    await dialog.accept();
  });
});

test("altera tipo de usuário para Pessoa Jurídica", async ({ page }) => {
  await page.goto(URL);

  await page.selectOption("select", { label: "Pessoa Jurídica" });

  const value = await page.$eval("select", (el) => el.value);
  expect(value).toBe("Pessoa Jurídica");
});

test("mostrar e esconder senha", async ({ page }) => {
  await page.goto(URL);

  const senhaInput = page.getByPlaceholder("Senha");
  const eyeBtn = page.locator(".eye-btn");

  expect(await senhaInput.getAttribute("type")).toBe("password");

  await eyeBtn.click();
  expect(await senhaInput.getAttribute("type")).toBe("text");
});

test("login PF redireciona para /home", async ({ page }) => {
  await page.goto(URL);

  await page.getByPlaceholder("E-mail").fill("user@test.com");
  await page.getByPlaceholder("Senha").fill("123456");

  await page.getByRole("button", { name: "Entrar" }).click();

  await page.waitForURL("**/home");

  expect(page.url()).toContain("/home");
});

test("login PJ redireciona para /admin", async ({ page }) => {
  await page.goto(URL);

  await page.selectOption("select", { label: "Pessoa Jurídica" });

  await page.getByPlaceholder("E-mail").fill("admin@test.com");
  await page.getByPlaceholder("Senha").fill("admin123");

  await page.getByRole("button", { name: "Entrar" }).click();

  await page.waitForURL("**/admin");

  expect(page.url()).toContain("/admin");
});