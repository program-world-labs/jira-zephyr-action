# Jira Zephyr Report Action

This action allows you to upload your test reports to Jira Zephyr, which is a test management tool that integrates with Jira.

## Inputs

### `project_key`

**Required** The key of the project in Jira.

### `format`

**Required** The format of the report. For example, `cucumber` `custom` `junit`.

### `auth`

**Required** The Authorization token to authenticate the request to Jira Zephyr API.

### `file_path`

**Required** The path of the report file to be uploaded.

### `auto_create_test_cases`

**Optional** Whether to auto-create test cases in Jira Zephyr. Default is `false`.

### `test_cycle`

**Optional** The test cycle associated with the report. It should be a JSON string, containing the properties like `name`, `description`, and `jiraProjectVersion`. Default is `null`.

## Usage

To use this action, you can create a workflow `.yml` file (for example `.github/workflows/main.yml`) in your repository:

```yaml
name: Upload to Jira Zephyr

on:
  push:
    branches:
      - main

jobs:
  upload:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      # generate or fetch the report here

      - name: Upload report to Jira Zephyr
        uses: programworld/jira-zephyr-report-action@v1
        with:
          project_key: "your_project_key"
          format: "cucumber"
          auth: ${{ secrets.JIRA_AUTH_TOKEN }}
          file_path: "path/to/your/report/file"
          auto_create_test_cases: "false"
          test_cycle: '{"name": "Test Regression", "description": "Regression test cycle 1 to ensure no breaking changes", "jiraProjectVersion": 10000}'
```

Replace `<your-github-username>` with your GitHub username, and adjust the values in `with` block to fit your needs.

**Note:** Please make sure to secure your authorization token by storing it as a [GitHub secret](https://docs.github.com/en/actions/reference/encrypted-secrets) and referencing it in your workflow file:

```yaml
auth: ${{ secrets.JIRA_AUTH_TOKEN }}
```

In this way, your token won't be exposed in your workflow file.

## Development

To develop and test this action locally, you can clone the repository and run `npm install` to install the dependencies.

To test the action, you can simulate the GitHub environment by setting environment variables before running your script:

```bash
INPUT_PROJECT_KEY='your_project_key' INPUT_FORMAT='cucumber' INPUT_AUTH='your_auth_token' INPUT_FILE_PATH='path/to/your/report/file' INPUT_AUTO_CREATE_TEST_CASES='false' INPUT_TEST_CYCLE='{"name": "Test Regression", "description": "Regression test cycle 1 to ensure no breaking changes", "jiraProjectVersion": 10000}' node index.js
```

## License

[MIT](LICENSE)

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
