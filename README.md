# Node Auth 1 Guided Project

Guided project for **Node Auth 1** Module.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds authentication to the API.

## Encryption vs Hashing

- for password storage use hashing, because encryption is 2 way, but hashing is one way. Once hashed there is no (easy) way of getting the original strink back.

## Auth Workflow

- register an account
- login
- log out
- restrict access to other users
