# Making new tests

## Introduction
The tests are written in [playwright for python](https://playwright.dev/python/docs/intro) and [unittest](https://docs.python.org/3/library/unittest.html).

## How to make a new test
1. Copy the `template.py` file in the `tests` folder and rename it to tells you what the files is testing with the naming scheme `test_*.py`.
2. Rename the class called `TestName` to something that tells you what the test is testing.
3. Beneath the comment `# new test function goes here` you are free to write your tests. Keep in mind that they need to be named `test*` for unittest to recognize them.
4. If you're testing a file beside `index.html` you need to change the file path on line 7 i.e. `super().setUp(fileToTest="index.html")`.