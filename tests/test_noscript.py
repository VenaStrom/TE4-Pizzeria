import unittest
from utils import *


class TestName(TemplateTest):
    def setUp(self) -> None:
        super().setUp(fileToTest="index.html")

    def setUpClass(self) -> None:
        super().setUpClass()
        self.context = self.browser.new_context(java_script_enabled=False)

    def doesBrowserExist(self) -> None:
        self.assertIsNotNone(self.page)

    def doesPageExist(self) -> None:
        self.assertEqual("complete", self.page.evaluate("document.readyState"))

    def doesNameExist(self) -> None:
        if (self.__class__.__name__ == "TestName"):
            self.fail("Test class name is not set. Please change")
            
    def testSelf(self) -> None:
        self.doesBrowserExist()
        self.doesPageExist()
        self.doesNameExist()
 
    # new test function goes here

    def testMenu(self) -> None:
        self.assertInAll([
            "Hawaii",
            "90 kr",
            "Vesuvio",
            "85 kr",
            "Pompeii",
            "90 kr"
        ], self.page.content())
        
    def testFilterButtonVisible(self) -> None:
        self.assertFalse(self.page.locator("#show-filters").is_visible())


if __name__ == "__main__":
    unittest.main(verbosity=2)
