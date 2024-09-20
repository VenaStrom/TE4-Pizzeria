# This file is ran by github workflows. There is no need to install any dependencies in this file or to run it manually.

import json
import unittest


# Custom test result that generates a JSON report
class JSONTestResult(unittest.TextTestResult):

    # Initialize the results list
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.results = []

    # Add a success to the results
    def addSuccess(self, test):
        super().addSuccess(test)
        self.results.append({"test": str(test), "outcome": "success"})

    # Add a failure to the results
    def addFailure(self, test, err):
        super().addFailure(test, err)
        self.results.append({"test": str(test), "outcome": "failure", "error": self._exc_info_to_string(err, test)})

    # Add an error to the results
    def addError(self, test, err):
        super().addError(test, err)
        self.results.append({"test": str(test), "outcome": "error", "error": self._exc_info_to_string(err, test)})


# Custom test runner that generates a JSON report
class JSONTestRunner(unittest.TextTestRunner):

    # Override the run method to return the result
    def run(self, test):
        result = super().run(test)
        return result

    # Override the _makeResult method to return a JSONTestResult
    def _makeResult(self):
        return JSONTestResult(self.stream, self.descriptions, self.verbosity)

    # Generate a JSON report from the result
    def generateJSONReport(self, result, output_file):
        with open(output_file, "w") as f:
            json.dump({"results": result.results}, f, indent=2)


if __name__ == "__main__":

    # Discover the tests
    loader = unittest.TestLoader()
    suite = loader.discover("tests", pattern="test_*.py")

    # Run the tests
    runner = JSONTestRunner(verbosity=2)
    result = runner.run(suite)

    # Write the result to a JSON file
    runner.generateJSONReport(result, "test_results/test_output.json")