const core = require("@actions/core");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { Readable } = require("stream");

async function run() {
  try {
    const projectKey = core.getInput("project_key");
    const format = core.getInput("format");
    const auth = core.getInput("auth");
    const filePath = core.getInput("file_path");
    var testCycle = core.getInput("test_cycle");
    var autoCreateTestCases = core.getInput("auto_create_test_cases");

    var autoCreateTestCases = false;

    testCycle = testCycle !== "" ? JSON.parse(testCycle) : null;

    autoCreateTestCases = autoCreateTestCases === "true" ? "true" : "false";
    const url =
      "https://api.zephyrscale.smartbear.com/v2/automations/executions/" +
      format +
      "?projectKey=" +
      projectKey +
      "&autoCreateTestCases=" +
      autoCreateTestCases;

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    if (testCycle) {
      const testCycleStream = Readable.from(JSON.stringify(testCycle));
      formData.append("testCycle", testCycleStream);
    }

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
        ...formData.getHeaders(),
      },
    });

    console.log(response.data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
