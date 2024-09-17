import unittest
from utils import *


class TestNoScript(TemplateTest):
    @classmethod
    def setUpClass(self) -> None:
        self.playwright = sync_playwright().start()
        browserType = self.playwright.chromium
        launchOptions = {"headless": True}
        self.browser = browserType.launch(**launchOptions)
        self.context = self.browser.new_context(java_script_enabled=False)
        self.page = self.context.new_page()

    def setUp(self) -> None:
        super().setUp(fileToTest="index.html")

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
