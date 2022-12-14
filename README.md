<p align="center">
  <img src="./assets/images/pizzaiolo.png" alt="Logo Pizzaiolo" width="250" height="200">
</p>
<h1 align="center">
  Pizzaiolo
</h1>

- [ð What is this?](#-what-is-this)
- [ð¤ Why?](#-why)
- [ð» Pre-requisites](#-pre-requisites)
- [âï¸ Configuration](#ï¸-configuration)
- [ð Installation](#-installation)
- [ð« Contributing](#-contributtins)
- [ð¤ Collaborators](#-colaborators)

## ð What is this?

This project is a simple **SlackBot** that integrates with **GitHub**.

Every time that a PULL REQUEST is created, updated, finished, commented or approved, this boot will send a message in a Slack Channel.

## ð¤ Why?

In our team we work with a code-review step.

In this moment, when a developer finish the code, it's necessary that another one review it.

But, how to maintain all PRs and their respective status stored in one place?

Thats is Pizzaiolo!

<p align="center">
  <img src="./assets/images/pizzaiolo-sample.jpg" alt="Sample Pizzaiolo">
</p>

## ð» Pre-requisites

You will need:

- An account with admin role in Slack;
- An account with admin role in GitHub;
- A place to host this bot;

## âï¸ Configuration

Before the installation, please you will need to configure:

- [Slack](docs/SLACK_CONFIG.md)
- [GitHub](docs/GITHUB_CONFIG.md)

## ð Installation

To install this bot, you need to follow these steps:

```
git clone git@github.com:diogocezar/pizzaiolo.git
cd pizzaiolo
yarn build
yarn start
```

## ð« Contributing

Please take a look on the [contributing](docs/CONTRIBUTING.md) session.

## ð¤ Collaborators

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
        <img src="https://github.com/joao208.png" width="100px;" alt="Foto do JoÃ£o"/><br>
        <sub>
          <b>JoÃ£o Barros</b>
        </sub>
      </a>
    </td>
    </td>
        <td align="center">
      <a href="https://github.com/Jott4">
        <img src="https://github.com/Jott4.png" width="100px;" alt="Foto do J"/><br>
        <sub>
          <b>JoÃ£o Victor</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
