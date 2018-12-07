<div align="center">
  <h1>Express & Mongoose PoC 🛠</h1>
  <p>open API using Nodejs & MongoDB</p>
</div>

<hr>

[![Greenkeeper badge](https://badges.greenkeeper.io/hadabo/express-poc.svg)](https://greenkeeper.io/)
[![Build Status][build-badge]][build]
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![MIT License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# Expressjs & Mongoose open API PoC

The idea behind this **PoC** is to create an **open API** using [Nodejs][node] through [Expressjs][express] & [MongoDB][mongodb] with the object modeling tool designed to work in an asynchronous environment [Mongoose][mongoose].

## Usage
Interested in Expressjs & Mongoose you can clone this project and give it a shoot:

```git clone https://github.com/hadabo/express-poc.git```

Make sure you have **[MongoDB Community Server][mdbcs]** running, then using **[mongoimport][mdbi]** create a new database & collection using your favorite terminal and import boxers.json data to your boxers collection to use it in this PoC:

```
mongoimport --db boxingclub --collection boxers --jsonArray users.json
```

## Running it 👟
after cloning the project just install the dependencies using ```yarn install``` and start the project using ```yarn start``` and follow the instructions on the console.

## Bugs! 🐞
if you face any issues running this project, please open a new card from the [issues tab!][issues]

## PRs
since this is a **PoC project** there are no restrictions on contributing, just make sure you create a feature branch and create a pull request after you're done.

## Security
If you discover any security related issues, please email [Abdul-hadi](mailto:ah.hawari@gmail.com) instead of using the issue tracker.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/172296?v=4" width="130px;"/><br /><sub>Abdul-hadi Hawari</sub>](http://hadabo.com)<br />[💻](https://github.com/hadabo/express-poc/commits?author=hadabo "Code") [📖](https://github.com/hadabo/express-poc/commits?author=hadabo "Documentation") [🚇](#infra-hadabo "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## LICENSE

MIT

[node]: https://github.com/nodejs/node
[express]: https://github.com/expressjs/express
[build-badge]: https://img.shields.io/travis/hadabo/express-poc.svg?style=flat-square
[build]: https://travis-ci.org/hadabo/express-poc
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/hadabo/express-poc/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/hadabo/express-poc.svg?style=social
[github-watch]: https://github.com/hadabo/express-poc/watchers
[github-star-badge]: https://img.shields.io/github/stars/hadabo/express-poc.svg?style=social
[github-star]: https://github.com/hadabo/express-poc/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20express-poc!%20https://github.com/hadabo/express-poc%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/hadabo/express-poc.svg?style=social
[issues]: https://github.com/hadabo/express-poc/issues
[mongodb]: https://github.com/mongodb/mongo
[mongoose]: https://github.com/Automattic/mongoose
[mdbcs]: https://www.mongodb.com/download-center/community
[mdbi]: https://docs.mongodb.com/manual/reference/program/mongoimport/
