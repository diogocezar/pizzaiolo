<p align="center">
  <img src="./assets/images/pizzaiolo.png" alt="Logo Pizzaiolo" width="250" height="200">
</p>
<h1 align="center">
  Pizzaiolo
</h1>

- [👉 What is this?](#-what-is-this)
- [🤌 Why?](#-why)
- [💻 Pre-requisites](#-pre-requisites)
- [☕️ Configuration](#️-configuration)
- [🚀 Installation](#-installation)
- [📫 Contributtins](#-contributtins)
- [🤝 Colaborators](#-colaborators)

## 👉 What is this?

This project is a simple **SlackBot** that integrates with **GitHub**.

Every time that a PULL REQUEST is created, updated, finished, commented or approved, this boot will send a message in a Slack Channel.

## 🤌 Why?

In our team we work with a code-review step.

In this moment, when a developer finish the code, it's necessary that another one review it.

But, how to mantain all PRs and their respectives status stored in one place?

Thats is Pizzaiolo!

<p align="center">
  <img src="./assets/images/pizzaiolo_sample.png" alt="Sample Pizzaiolo">
</p>

## 💻 Pre-requisites

You will need:

- An account with admin role in Slack;
- An account with admin role in GitHub;
- A place to host this bot;

## ☕️ Configuration

Before the instalation, please you will need to configure:

- [Slack](docs/SLACK_CONFIG.md)
- [GitHub](docs/GITHUB_CONFIG.md)

## 🚀 Installation

To install this bot, you need to follow these steps:

```
git clone git@github.com:diogocezar/pizzaiolo.git
cd pizzaiolo
yarn build
yarn start
```

## 📫 Contributtins

Please take a look on the [contributing](docs/CONTRIBUTING.md) session.

## 🤝 Colaborators

So many pizzas to:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/diogocezar">
        <img src="https://github.com/diogocezar.png" width="100px;" alt="Foto do Diogo"/><br>
        <sub>
          <b>Diogo Cezar</b>
        </sub>
      </a>
    </td>
        <td align="center">
      <a href="https://github.com/joao208">
        <img src="https://github.com/joao208.png" width="100px;" alt="Foto do João"/><br>
        <sub>
          <b>João Barros</b>
        </sub>
      </a>
    </td>
    </td>
        <td align="center">
      <a href="https://github.com/Jott4">
        <img src="https://github.com/Jott4.png" width="100px;" alt="Foto do J"/><br>
        <sub>
          <b>João Victor</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
